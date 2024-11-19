import {Effect, Layer, ManagedRuntime, pipe} from 'effect'
import {type Component, Show, createEffect, onCleanup, onMount} from 'solid-js'
import {useSettings} from '~/config/settings-context.tsx'
import {FileSystem} from '~/lib/file-system'
import * as styles from './background.css.ts'

const Background: Component = () => {
  const [settings, {setBackground}] = useSettings()
  const runtime = ManagedRuntime.make(
    Layer.effect(
      FileSystem.FileSystem,
      FileSystem.make(Effect.promise(() => navigator.storage.getDirectory())),
    ),
  )

  onMount(() => {
    runtime.runPromise(
      pipe(
        Effect.map(FileSystem.FileSystem, (_) => _.getFile),
        Effect.flatMap((r) => r('background')),
        Effect.map(setBackground),
      ),
    )
  })

  createEffect(() => {
    const {background} = settings
    if (background === undefined) return

    runtime.runPromise(
      pipe(
        Effect.map(FileSystem.FileSystem, (_) => _.writeFile),
        Effect.flatMap((w) => w('background', background)),
      ),
    )
  })

  onCleanup(() => {
    runtime.dispose()
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
