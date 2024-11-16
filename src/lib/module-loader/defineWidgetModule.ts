import {Context, Layer, ManagedRuntime} from 'effect'
import type {Component} from 'solid-js'

type WidgetConfig = {
  namespace: string
  widget: Component<{
    runtime?: ManagedRuntime.ManagedRuntime<WidgetContext, never>
  }>
}

export class WidgetContext extends Context.Tag('@widget/context')<
  WidgetContext,
  {readonly namespace: string}
>() {}

export const defineWidgetModule = ({namespace, widget}: WidgetConfig) => ({
  widget,
  runtime: ManagedRuntime.make(Layer.succeed(WidgetContext, {namespace})),
})
