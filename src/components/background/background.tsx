import {Effect, pipe} from 'effect'
import {type Component, Show, createEffect, onMount} from 'solid-js'
import {useSettings} from '~/config/settings-context.tsx'
import * as styles from './background.css.ts'

const Background: Component = () => {
  const [settings, {setBackground}] = useSettings()

  const getFileHandle = pipe(
    Effect.promise(() => navigator.storage.getDirectory()),
    Effect.flatMap((h) =>
      Effect.promise(() => h.getFileHandle('background', {create: true})),
    ),
  )

  onMount(async () => {
    const loadBackground = pipe(
      getFileHandle,
      Effect.flatMap((f) => Effect.promise(() => f.getFile())),
      Effect.map(setBackground),
    )

    Effect.runPromise(loadBackground)
  })

  createEffect(() => {
    const {background} = settings

    if (background !== undefined) {
      const saveBackground = Effect.gen(function* () {
        const h = yield* getFileHandle
        const w = yield* Effect.promise(() => h.createWritable())
        yield* Effect.promise(() => w.write(background))
        yield* Effect.promise(() => w.close())
      })

      Effect.runPromise(saveBackground)
    }
  })

  return (
    <Show when={settings.background}>
      {(file) => (
        <Show when={file().size > 0}>
          <img
            alt={file().name}
            src={URL.createObjectURL(file())}
            class={styles.Background}
            draggable="false"
          />
        </Show>
      )}
    </Show>
  )
}

export default Background
