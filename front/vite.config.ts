import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { environment: 'happy-dom', exclude: [...configDefaults.exclude, 'e2e/*'] },
  base: './',
  resolve: {
    alias: {
      '#': path.resolve(__dirname)
    }
  }
})
