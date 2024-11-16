import {Effect} from 'effect'
import {type Component, For, createSignal, onMount} from 'solid-js'
import Background from './components/background/background.tsx'
import SidePanel from './components/side-panel/side-panel.tsx'
import {SettingsProvider} from './config/settings-context.tsx'
import {loadViteModules} from './lib/module-loader/loadWidgets.ts'
import {loadPlugins} from './lib/plugins/pluginLoader.ts'

const App: Component = () => {
  const [plugins, setPlugins] = createSignal<Component[]>()
  const [widgets, setWidgets] = createSignal<Component[]>()

  onMount(async () => {
    const result = await Effect.runPromise(loadPlugins)
    const _plugins = result.flatMap((_) => _.widgets)
    setPlugins(_plugins)
    setWidgets(loadViteModules().flatMap((_) => _.widget))
  })

  return (
    <SettingsProvider>
      <SidePanel />
      <Background />

      <For each={plugins()}>{(W) => <W />}</For>
      <For each={widgets()}>{(W) => <W />}</For>
    </SettingsProvider>
  )
}

export default App
