import {Context, type Effect, Layer} from 'effect'
import {
  RootDirectory,
  getFile,
  makeDirectory,
  writeFile,
} from './internal/fileSystem.ts'

interface FileSystem {
  /**
   * Create a directory at `path`.
   */
  readonly makeDirectory: (
    path: string,
  ) => Effect.Effect<void, never, RootDirectory>
  /**
   * Write data to a file at `path`.
   */
  readonly writeFile: (
    path: string,
    data: File,
  ) => Effect.Effect<void, never, RootDirectory>
  /**
   * Get file recursive.
   */
  readonly getFile: (path: string) => Effect.Effect<File, never, RootDirectory>
}

export const FileSystem = Context.GenericTag<FileSystem>(
  '@file-system/FileSystem',
)

export const make = (root: Effect.Effect<FileSystemDirectoryHandle>) =>
  Layer.mergeAll(
    Layer.succeed(FileSystem, {makeDirectory, writeFile, getFile}),
    Layer.effect(RootDirectory, root),
  )
