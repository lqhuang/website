import { resolve } from 'node:path'

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // environment: 'jsdom',
    includeSource: ['src/**/*.test.{js,ts}'],
  },
  resolve: {
    alias: {
      src: resolve(import.meta.dirname, 'src'),
    },
  },
})
