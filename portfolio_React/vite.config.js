import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Personal-Website-React-/',
  build: {
    outDir: 'dist'
  }
})
