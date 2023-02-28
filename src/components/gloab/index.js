import { ElDialog } from "element-plus";
import Layout from './Layout.vue'
import "element-plus/es/components/dialog/style/css";
ElDialog.__name = 'el-dialog'

const components = [ElDialog, Layout]
export default {
    install: (app, options) => {
        components.forEach(c => {
            app.component(c.__name, c)
        })
    }
}