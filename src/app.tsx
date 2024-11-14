import {Effect} from 'effect'
import {type Component, For, createSignal, onMount} from 'solid-js'
import Background from './components/background/background.tsx'
import SidePanel from './components/side-panel/side-panel.tsx'
import {SettingsProvider} from './config/settings-context.tsx'
import {loadPlugins} from './lib/plugins/pluginLoader.ts'
import WeatherWidget from './widgets/weather/weather.tsx'

const App: Component = () => {
  const [plugins, setPlugins] = createSignal<Component[]>()

  onMount(async () => {
    const result = await Effect.runPromise(loadPlugins)
    const widgets = result.flatMap((_) => _.widgets)
    setPlugins(widgets)
  })

  return (
    <SettingsProvider>
      <SidePanel />
      <Background />
      <WeatherWidget />

      <For each={plugins()}>{(W) => <W />}</For>
    </SettingsProvider>
  )
}

export default App
