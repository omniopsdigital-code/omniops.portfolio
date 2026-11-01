import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main:            resolve(import.meta.dirname, 'index.html'),
        notaSpeaks:      resolve(import.meta.dirname, 'nota-speaks.html'),
        saraLegal:       resolve(import.meta.dirname, 'sara-legal.html'),
        works:           resolve(import.meta.dirname, 'works.html'),
        extremeClasses:  resolve(import.meta.dirname, 'works/extreme-classes.html'),
        vmoveLogistics:  resolve(import.meta.dirname, 'works/vmove-logistics.html'),
        dejaNeww:        resolve(import.meta.dirname, 'works/deja-neww.html'),
        reevaAquatech:   resolve(import.meta.dirname, 'works/reeva-aquatech.html'),
        divyanshi:       resolve(import.meta.dirname, 'founders/divyanshi.html'),
        vedansh:         resolve(import.meta.dirname, 'founders/vedansh-chamoli.html'),
      }
    }
  }
})
