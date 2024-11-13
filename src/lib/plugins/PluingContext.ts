import {Context, type Effect} from 'effect'

export class PluingContext extends Context.Tag('@app/pluings')<
  PluingContext,
  {readonly config: Effect.Effect<object>}
>() {}
