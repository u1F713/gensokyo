import {type Component, createSignal, onCleanup} from 'solid-js'
import Background from './components/background/background.tsx'
import SidePanel from './components/side-panel/side-panel.tsx'
import {SettingsProvider} from './config/settings-context.tsx'

const App: Component = () => {
  const [time, setTime] = createSignal(Date.now())
  const interval = setInterval(() => setTime(Date.now()), 100)
  const formatter = Intl.DateTimeFormat(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  onCleanup(() => {
    clearInterval(interval)
  })

  return (
    <SettingsProvider>
      <SidePanel />
      <Background />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          translate: '-50% -50%',
          'font-size': '2rem',
        }}
      >
        <b>{formatter.format(time())}</b>
      </div>
    </SettingsProvider>
  )
}

export default App
