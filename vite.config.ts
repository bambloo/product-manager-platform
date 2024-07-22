import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [vue(), vueJsx(), vueDevTools()],
  root: './client',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./client/src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/wpi': {
        target: 'http://127.0.0.1:1992',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wpi/, '')
      }
    }
  }
})
