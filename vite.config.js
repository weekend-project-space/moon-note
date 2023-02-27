import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "components": path.resolve(__dirname, "src/components"),
      "api": path.resolve(__dirname, "src/api"),
      "views": path.resolve(__dirname, "src/views"),
    },
  },
  plugins: [
    vue(),
    ElementPlus({
      // options
    }),
  ],
})
