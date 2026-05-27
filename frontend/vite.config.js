import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // Tree-shaking automático: solo importa los componentes de Vuetify que uses
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Vite 8 usa oxc como minificador por defecto (más rápido que esbuild/terser)
    // No se especifica minify para usar el óptimo automáticamente
    // Target: Chromium moderno (Electron usa Chromium actualizado)
    target: 'chrome110',
    rollupOptions: {
      output: {
        // Separar vendors en chunks independientes → Electron los cachea
        // y el JS inicial que debe parsearse al arranque es mínimo
        // Nota: Vite 8 (rolldown) requiere función, no objeto
        manualChunks(id) {
          if (id.includes('node_modules/vuetify')) return 'vendor-vuetify'
          if (id.includes('node_modules/@mdi')) return 'vendor-icons'
          if (id.includes('node_modules/vue') || id.includes('node_modules/pinia')) return 'vendor-vue'
        },
      },
    },
    // Límite de advertencia de chunk (Vuetify es grande, es normal)
    chunkSizeWarningLimit: 1000,
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
