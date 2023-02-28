import { createApp } from 'vue'
import './style.css'
import "@mdi/font/css/materialdesignicons.min.css"
import App from './App.vue'
import widget from './components/widget'
import gloabCom from './components/gloab'
import { createPinia } from 'pinia'
const pinia = createPinia()
import router from './router';

const app = createApp(App);
app.use(pinia).use(router).use(widget).use(gloabCom).mount('#app')
