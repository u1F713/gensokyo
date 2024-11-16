import {type Component, For, createSignal, onMount} from 'solid-js'
import Background from './components/background/background.tsx'
import SidePanel from './components/side-panel/side-panel.tsx'
import {SettingsProvider} from './config/settings-context.tsx'
import {loadViteModules} from './lib/module-loader/loadWidgets.ts'

const App: Component = () => {
  const [widgets, setWidgets] = createSignal<Component[]>()

  onMount(async () => {
    setWidgets(loadViteModules().flatMap((_) => _.widget))
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
