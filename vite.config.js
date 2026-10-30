import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        notaSpeaks: resolve(import.meta.dirname, 'nota-speaks.html'),
        saraLegal: resolve(import.meta.dirname, 'sara-legal.html'),
      }
    }
  }
})
