import { createApp } from 'vue'
import App from './App.vue'
import Vue3Directive from '@dist/v-driver'

const app = createApp(App)

app.use(Vue3Directive)

app.mount('#app')
