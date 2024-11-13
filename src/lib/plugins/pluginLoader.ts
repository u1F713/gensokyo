import {Chunk, Effect, Stream, pipe} from 'effect'
import type {Component} from 'solid-js'

export interface Plugin {
  widgets: Component[]
}

const plugins = import.meta.glob('/src/plugins/**/+plugin.ts', {
  import: 'default',
}) as Record<string, () => Promise<Plugin>>

export const pluginStream = pipe(
  Stream.make(...Object.values(plugins)),
  Stream.flatMap(Effect.promise),
)

export const loadPlugins = Effect.gen(function* () {
  const pluginChunk = yield* Stream.runCollect(pluginStream)
  return Chunk.toReadonlyArray(pluginChunk)
})
