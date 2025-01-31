import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "@svgr/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@layouts': '/src/layouts',
      '@utils': '/src/utils',
      '@api': '/src/api',
    },
  },
})
