import {Context, Effect, pipe} from 'effect'
import * as opfs from './opfs.ts'

export type RootDirectory = FileSystemDirectoryHandle

export const RootDirectory =
  Context.GenericTag<RootDirectory>('@file-system/root')

export const makeDirectory = (path: string) =>
  Effect.flatMap(RootDirectory, opfs.getDirectoryHandle(path, {create: true}))

export const writeFile = (path: string, file: File) =>
  pipe(
    Effect.flatMap(RootDirectory, opfs.getFileHandle(path)),
    Effect.flatMap(opfs.writeFile(file)),
  )

export const getFile = (path: string) =>
  pipe(
    Effect.flatMap(RootDirectory, opfs.getFileHandle(path, {create: true})),
    Effect.flatMap(opfs.getFile),
  )
