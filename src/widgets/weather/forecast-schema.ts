import {Schema as S} from 'effect'

const WeatherDetails = S.Struct({
  air_pressure_at_sea_level: S.Number,
  air_temperature: S.Number,
  cloud_area_fraction: S.Number,
  relative_humidity: S.Number,
  wind_from_direction: S.Number,
  wind_speed: S.Number,
})

export const ForecastSchema = S.Struct({
  properties: S.Struct({
    timeseries: S.Array(
      S.Struct({
        time: S.Date,
        data: S.Struct({instant: S.Struct({details: WeatherDetails})}),
      }),
    ),
  }),
  expires: S.Date,
})

export type ForecastSchema = typeof ForecastSchema.Type
