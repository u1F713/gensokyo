import {Effect} from 'effect'
import {getDirectoryHandle, getFileHandle, opfsFile} from './opfs.ts'

export const makeDirectory =
  (root: FileSystemDirectoryHandle) => (path: string) =>
    getDirectoryHandle(path, {create: true})(root)

export const getFileFactory =
  (root: FileSystemDirectoryHandle) => (path: string) =>
    Effect.flatMap(getFileHandle(path, {create: true})(root), opfsFile.getFile)

export const writeFileFactory =
  (root: FileSystemDirectoryHandle) => (path: string, file: File) =>
    Effect.flatMap(getFileHandle(path)(root), opfsFile.writeFile(file))
