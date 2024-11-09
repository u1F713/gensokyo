import {type ParentComponent, createContext, useContext} from 'solid-js'
import {createStore} from 'solid-js/store'

export interface SettingsState {
  background?: File
}

export type SettingsContextType = readonly [
  SettingsState,
  {setBackground: (file: File) => void},
]

const SettingsContext = createContext<SettingsContextType>()

export const SettingsProvider: ParentComponent = (props) => {
  const [settings, setSettings] = createStore<SettingsState>()

  const context: SettingsContextType = [
    settings,
    {
      setBackground: (file: File) => setSettings('background', file),
    },
  ]

  return (
    <SettingsContext.Provider value={context}>
      {props.children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context !== undefined) return context
  throw new Error('useSettings should be called inside its ContextProvider')
}
