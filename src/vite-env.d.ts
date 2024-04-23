/// <reference types="vite/client" />


// vue
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  export default DefineComponent<{}, {}, any>
}
// type declare for example use
declare module '@dist/v-driver'