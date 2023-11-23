import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'

import 'vue-toastification/dist/index.css'

import './assets/style.css'
import App from './App.vue'

const pinia = createPinia()
createApp(App).use(Toast).use(createPinia()).mount('#app')
