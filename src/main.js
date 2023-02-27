import { createApp } from 'vue'
import './style.css'
import "@mdi/font/css/materialdesignicons.min.css"
import App from './App.vue'
import Widget from 'components/widget/index.js'
import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App).use(pinia).use(Widget).mount('#app')
