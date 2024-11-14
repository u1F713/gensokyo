import {type Component, createSignal, onCleanup, onMount} from 'solid-js'
import * as styles from './Time.css.ts'

const TimeWidget: Component = () => {
  const [time, setTime] = createSignal<number>()
  const formatter = Intl.DateTimeFormat(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    second: 'numeric',
    hour12: false,
  })

  onMount(() => {
    const interval = setInterval(() => setTime(Date.now()), 50)
    setTime(Date.now())

    onCleanup(() => {
      clearInterval(interval)
    })
  })

  return (
    <div class={styles.TimeWidget}>
      <b>{formatter.format(time())}</b>
    </div>
  )
}

export default TimeWidget
