import {Effect, ManagedRuntime} from 'effect'
import {type Component, For, createSignal, onCleanup, onMount} from 'solid-js'
import Background from './components/background/background.tsx'
import SidePanel from './components/side-panel/side-panel.tsx'
import {SettingsProvider} from './config/settings-context.tsx'
import {FileSystem} from './lib/file-system'
import {loadViteModules} from './lib/module-loader/loadWidgets.ts'

const App: Component = () => {
  const [widgets, setWidgets] = createSignal<Component[]>()
  const runtime = ManagedRuntime.make(
    FileSystem.make(Effect.promise(() => navigator.storage.getDirectory())),
  )

  onMount(async () => {
    setWidgets(loadViteModules().flatMap((_) => _.widget))
  })

  onCleanup(() => {
    runtime.dispose()
  })

  return (
    <SettingsProvider>
      <SidePanel />
      <Background />

      <For each={widgets()}>{(W) => <W />}</For>
    </SettingsProvider>
  )
}

export default App
