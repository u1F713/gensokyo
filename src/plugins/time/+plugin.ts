import {lazy} from 'solid-js'
import type {Plugin} from '~/lib/plugins/pluginLoader.ts'

export default {
  widgets: [lazy(() => import('./Time.tsx'))],
} satisfies Plugin
