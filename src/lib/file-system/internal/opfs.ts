import {Effect, Stream, pipe} from 'effect'

export const makeDirectory = (dirname: string) =>
  Effect.gen(function* () {
    const root = yield* Effect.promise(() => navigator.storage.getDirectory())
    const path = dirname.split('/').filter((_) => _ !== '')

    return yield* Stream.make(...path).pipe(
      Stream.runFoldEffect(root, (s, a) =>
        Effect.promise(() => s.getDirectoryHandle(a, {create: true})),
      ),
    )
  })

const getFileHandle = (filename: string) =>
  Effect.gen(function* () {
    const lastSlash = filename.lastIndexOf('/')
    const directory = yield* makeDirectory(filename.substring(0, lastSlash))

    return yield* Effect.promise(() =>
      directory.getFileHandle(filename.substring(lastSlash + 1), {
        create: true,
      }),
    )
  })

export const writeFile = (filename: string, file: File) =>
  pipe(
    getFileHandle(filename),
    Effect.map((f) => Effect.promise(() => f.createWritable())),
    Effect.flatMap(Effect.tap((w) => w.write(file))),
    Effect.flatMap((w) => Effect.promise(() => w.close())),
  )

export const readFile = (filename: string) =>
  pipe(
    getFileHandle(filename),
    Effect.flatMap((f) => Effect.promise(() => f.getFile())),
  )
