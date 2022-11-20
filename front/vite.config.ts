import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: Number(process.env.PORT) || 3001 },
  plugins: [react()],
  test: { environment: 'happy-dom' },
  base: './',
  resolve: {
    alias: {
      '#': path.resolve(__dirname)
    }
  }
})
