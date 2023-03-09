// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler' // 
import App from './App.vue'
import router from './router'
import i18n from "./translations"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import './assets/main.css'

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')
