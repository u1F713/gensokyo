import {Effect, Stream, pipe} from 'effect'
import {getDirectoryHandle, getFileHandle, opfsFile} from './opfs.ts'

export const makeDirectory =
  (root: FileSystemDirectoryHandle) => (path: string) =>
    pipe(
      Stream.fromIterable(path.match(/[^\/]+/g) ?? []),
      Stream.runFoldEffect(root, (parent, path) =>
        getDirectoryHandle(path, {create: true})(parent),
      ),
    )

export const getFileFactory =
  (root: FileSystemDirectoryHandle) => (path: string) =>
    Effect.flatMap(getFileHandle(path, {create: true})(root), opfsFile.getFile)

export const writeFileFactory =
  (root: FileSystemDirectoryHandle) => (path: string, file: File) =>
    Effect.flatMap(getFileHandle(path)(root), opfsFile.writeFile(file))
