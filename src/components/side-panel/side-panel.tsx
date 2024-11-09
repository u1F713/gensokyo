import type {Component} from 'solid-js'
import {useSettings} from '~/config/settings-context'

const SidePanel: Component = () => {
  const [, {setBackground}] = useSettings()

  const updateBackground = (
    e: InputEvent & {currentTarget: HTMLInputElement; target: Element},
  ) => {
    if (e.currentTarget.files != null) {
      setBackground(e.currentTarget.files[0])
    }
  }

  return (
    <div>
      <input type="file" onInput={updateBackground} />
    </div>
  )
}

export default SidePanel
