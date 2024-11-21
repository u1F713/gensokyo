import {Effect, Stream, pipe} from 'effect'

export const getDirectoryHandle =
  (path: string, options?: {create: boolean}) =>
  (root: FileSystemDirectoryHandle) =>
    pipe(
      Stream.fromIterable(path.match(/[^\/]+/g) ?? []),
      Stream.runFoldEffect(root, (parent, path) =>
        Effect.promise(() => parent.getDirectoryHandle(path, options)),
      ),
    )

export const getFileHandle =
  (path: string, options?: {create: boolean}) =>
  (parent: FileSystemDirectoryHandle) => {
    const lastIndex = path.lastIndexOf('/')

    const getHandle = (path: string) => (parent: FileSystemDirectoryHandle) =>
      Effect.promise(() => parent.getFileHandle(path, options))

    return Effect.flatMap(
      getDirectoryHandle(path.substring(0, lastIndex))(parent),
      getHandle(path.substring(lastIndex + 1)),
    )
  }

export const getFile = (file: FileSystemFileHandle) =>
  Effect.promise(() => file.getFile())

export const writeFile = (file: File) => (handle: FileSystemFileHandle) =>
  pipe(
    Effect.promise(() => handle.createWritable()),
    Effect.tap((w) => Effect.promise(() => w.write(file))),
    Effect.flatMap((w) => Effect.promise(() => w.close())),
  )
