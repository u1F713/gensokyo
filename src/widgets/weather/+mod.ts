import {lazy} from 'solid-js'
import {defineWidgetModule} from '~/lib/module-loader/defineWidgetModule'

export default defineWidgetModule({
  namespace: 'weather',
  widget: lazy(() => import('./weather.tsx')),
})
