import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative paths keep the build portable across GitHub Pages sub-paths.
  base: './',
  plugins: [react()],
})
