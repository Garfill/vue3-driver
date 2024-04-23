import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css';


const formats = ['es', 'umd']
function getOutputOption(formats: string[]): any[] {
  return formats.map(format => {
    return {
      format: format,
      dir: './dist',
      entryFileNames: format === 'es' ? 'v-driver.js' : `v-driver.${format}.js`,
      // Put chunk files at <output>/chunks
      chunkFileNames: 'chunks/v-driver.[hash].js',
      // Put chunk styles at <output>/assets
      assetFileNames: 'style/v-driver[extname]',
      name: 'VDriver'
    }
  })
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), libInjectCss()],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'lib'),
      '@dist': path.resolve(__dirname, 'dist'),
    }
  },
  build: {
    cssCodeSplit: true,
    minify: false,
    lib: {
      entry: path.resolve(__dirname, './lib/index.ts'),
      name: 'VDriver',
      fileName: 'v-driver',
    },
    rollupOptions: {
      external: ['vue'],
      output: getOutputOption(formats)
    }
  }
})
