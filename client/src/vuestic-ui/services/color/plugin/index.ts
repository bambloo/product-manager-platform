import { PartialGlobalConfig } from '../../global-config/types'
import { createColorConfigPlugin } from './create-color-config-plugin'
import { defineGlobalProperty, defineVuesticPlugin } from '../../vue-plugin/utils'

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const ColorConfigPlugin = defineVuesticPlugin((config?: PartialGlobalConfig) => ({
  install(app) {
    defineGlobalProperty(app, '$vaColorConfig', createColorConfigPlugin(app, config))
  }
}))

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaColorConfig: ReturnType<typeof createColorConfigPlugin>
  }
}
