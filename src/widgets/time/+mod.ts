import {lazy} from 'solid-js'
import {defineWidgetModule} from '~/lib/module-loader/defineWidgetModule.ts'

export default defineWidgetModule({
  namespace: 'time',
  widget: lazy(() => import('./Time.tsx')),
})
