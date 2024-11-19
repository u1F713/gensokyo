import {Context, Effect} from 'effect'
import {
  getFileFactory,
  makeDirectory,
  writeFileFactory,
} from './internal/fileSystem.ts'

export interface FileSystem {
  /**
   * Create a directory at `path`.
   */
  readonly makeDirectory: (path: string) => Effect.Effect<void, never>
  /**
   * Write data to a file at `path`.
   */
  readonly writeFile: (path: string, data: File) => Effect.Effect<void, never>
  /**
   * Get file recursive.
   */
  readonly getFile: (path: string) => Effect.Effect<File>
}

export const FileSystem = Context.GenericTag<FileSystem>(
  '@file-system/FileSystem',
)

export const make = (root: Effect.Effect<FileSystemDirectoryHandle>) =>
  Effect.map(root, (_) =>
    FileSystem.of({
      makeDirectory: makeDirectory(_),
      writeFile: writeFileFactory(_),
      getFile: getFileFactory(_),
    }),
  )
