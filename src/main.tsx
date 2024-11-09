/* @refresh reload */
import {render} from 'solid-js/web'
import App from './app.tsx'
import './styles/global.css.ts'

render(() => <App />, document.getElementById('root') as HTMLElement)
