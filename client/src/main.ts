import { createApp } from 'vue'
import i18n from './i18n'
import { createVuestic } from './vuestic-ui/main'
import { createGtm } from '@gtm-support/vue-gtm'

import router from './router'
import vuesticGlobalConfig from './vuestic-config'
import App from './App.vue'
import stores from './stores'

const app = createApp(App)

app.use(stores)
app.use(router)
app.use(i18n)
app.use(createVuestic({ config: vuesticGlobalConfig }))
app.config.errorHandler = (err, vm, info) => {
  console.error(err, info)
}

if (import.meta.env.VITE_APP_GTM_ENABLED) {
  app.use(
    createGtm({
      id: import.meta.env.VITE_APP_GTM_KEY,
      debug: false,
      vueRouter: router
    })
  )
}

app.mount('#app')
