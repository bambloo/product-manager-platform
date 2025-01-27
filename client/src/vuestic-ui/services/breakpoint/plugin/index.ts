import { createBreakpointConfigPlugin } from './create-service'
import { defineGlobalProperty, defineVuesticPlugin } from '../../vue-plugin/utils'

import { vaBreakpointSymbol } from '..'

export const BreakpointConfigPlugin = defineVuesticPlugin(() => ({
  install(app) {
    const breakpointConfig = createBreakpointConfigPlugin(app)
    app.provide(vaBreakpointSymbol, breakpointConfig)
    defineGlobalProperty(app, '$vaBreakpoint', breakpointConfig)
  }
}))

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaBreakpoint: ReturnType<typeof createBreakpointConfigPlugin>
  }
}
