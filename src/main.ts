import { createApp } from 'vue'
import App from './App.vue'
import PageA from './PageA.vue'
import PageB from "./PageB.vue"
import Vue3Directive from '@lib'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "./Home.vue";
import Multi from "./Multi.vue";
import Option from "./Option.vue";

const app = createApp(App)

const routes = [
  {path: '/', component: Home},
  {path: '/a', component: PageA},
  {path: '/b', component: PageB},
  {path: '/multi', component: Multi},
  {path: '/option', component: Option},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

app.use(router)

app.use(Vue3Directive)

app.mount('#app')
