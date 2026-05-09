import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/img': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        secure: false,
      },
      '/videos': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        secure: false,
      },
    }
  },
})
