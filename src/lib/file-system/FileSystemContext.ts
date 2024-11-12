import {Context, Layer} from 'effect'
import * as opfs from './internal/opfs.ts'

export class FileSystemContext extends Context.Tag('FileSystem')<
  FileSystemContext,
  {
    readonly writeFile: typeof opfs.writeFile
    readonly readFile: typeof opfs.readFile
  }
>() {
  static Live = Layer.succeed(
    FileSystemContext,
    FileSystemContext.of({readFile: opfs.readFile, writeFile: opfs.writeFile}),
  )
}
