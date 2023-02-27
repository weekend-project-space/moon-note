import { createApp } from 'vue'
import './style.css'
import "@mdi/font/css/materialdesignicons.min.css"
import App from './App.vue'
import Widget from 'components/widget/index.js'
import "element-plus/es/components/dialog/style/css";
import { ElDialog } from "element-plus";
import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App);
app.component('el-dialog', ElDialog)
app.use(pinia).use(Widget).mount('#app')
