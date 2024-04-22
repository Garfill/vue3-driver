import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'lib'),
    }
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, './lib/index.ts'),
      name: 'VueDriver',
      fileName: 'vue-driverjs',
      formats: ['es', 'umd'],
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['vue'],
    }
  }
})
