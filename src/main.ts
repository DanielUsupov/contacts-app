import { createApp } from 'vue'
import { vMaska } from 'maska'
import './style.css'
import router from './router'
import App from './App.vue'
import pinia from './store'

const app = createApp(App)
app
  .use(router)
  .use(pinia)

app.directive('maska', vMaska)

app.mount('#app')
