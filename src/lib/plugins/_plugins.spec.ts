import {describe, it} from '@effect/vitest'
import {Effect, Layer} from 'effect'
import {PluingContext} from './PluingContext.ts'
import {loadPlugins} from './pluginLoader.ts'

describe('', () => {
  const live = Layer.succeed(
    PluingContext,
    PluingContext.of({config: Effect.succeed({})}),
  )

  it.effect('plugins loader', () => loadPlugins.pipe(Effect.provide(live)))
})
