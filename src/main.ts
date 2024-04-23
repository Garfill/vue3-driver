import { createApp } from 'vue'
import App from './App.vue'
import PageA from './pageA.vue'
import PageB from "./pageB.vue"
import Vue3Directive from '@lib'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "./Home.vue";
import Multi from "./multi.vue";

const app = createApp(App)

const routes = [
  {path: '/', component: Home},
  {path: '/a', component: PageA},
  {path: '/b', component: PageB},
  {path: '/multi', component: Multi},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

app.use(router)

app.use(Vue3Directive)

app.mount('#app')
