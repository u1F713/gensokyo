import {Effect, Either, Schema, pipe} from 'effect'
import {
  type Component,
  Show,
  createResource,
  createSignal,
  onMount,
} from 'solid-js'
import {ForecastSchema} from './forecast-schema'

const getFileHandle = pipe(
  Effect.promise(() => navigator.storage.getDirectory()),
  Effect.tryMapPromise({
    catch: (_) => _,
    try: (_) => _.getFileHandle('weather-local.json', {create: true}),
  }),
)

const fetchDataRemote = (url: string) =>
  Effect.gen(function* () {
    const res = yield* Effect.promise(() => fetch(url))
    const json = yield* Effect.promise(() => res.json())
    const fileHandle = yield* getFileHandle
    const writable = yield* Effect.promise(() => fileHandle.createWritable())
    const data = yield* Schema.decode(ForecastSchema)({
      ...json,
      expires: res.headers.get('expires'),
    })

    yield* Effect.promise(() =>
      writable.write(JSON.stringify(data)).then(() => writable.close()),
    )

    return data
  })

const readLocalData = Effect.gen(function* () {
  const fileHandle = yield* getFileHandle
  const content = yield* Effect.promise(() =>
    fileHandle.getFile().then((_) => _.text()),
  )
  const data = yield* Schema.decode(Schema.parseJson(ForecastSchema))(content)

  return yield* data.expires.getTime() < Date.now()
    ? Effect.fail(new Error('data expires'))
    : Effect.succeed(data)
})

export const getWeatherData = (url: string) =>
  Effect.gen(function* () {
    const localData = yield* Effect.either(readLocalData)

    return yield* Either.isLeft(localData)
      ? fetchDataRemote(url)
      : Effect.succeed(localData.right)
  })

type coords = {lat?: number; log?: number}

const getWeather = ({lat, log}: coords) => {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${log}`
  return Effect.runPromise(getWeatherData(url))
}

const WeatherWidget: Component = () => {
  const [coords, setCoords] = createSignal<coords>()
  const [weatherData] = createResource(coords, getWeather)

  onMount(async () => {
    navigator.geolocation.getCurrentPosition((_) => {
      setCoords({lat: _.coords.latitude, log: _.coords.longitude})
    })
  })

  return (
    <Show when={weatherData()?.properties}>
      {(w) => w().timeseries[0].data.instant.details.air_temperature}
    </Show>
  )
}

export default WeatherWidget
