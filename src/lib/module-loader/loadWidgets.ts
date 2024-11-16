import {pipe} from 'effect'
import type {defineWidgetModule} from './defineWidgetModule'

export const loadViteModules = () =>
  pipe(
    import.meta.glob<ReturnType<typeof defineWidgetModule>>(
      '/src/widgets/**/+mod.ts',
      {import: 'default', eager: true},
    ),
    (_) => Object.values(_),
  )
