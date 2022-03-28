import { createApp } from 'vue'
import router from './index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'lib-flexible'
import axios from 'axios'
import AddCodeGate from './components/AddCodeGate.vue'
import baiduMap from './components/BMapMarker.vue'
import { ElMessage } from 'element-plus'
import store from '@/store'

const app = createApp(App) // 创建实例
app.config.globalProperties.$axios = axios
app.provide('$message', ElMessage)
app.provide('$store', store)
// app.use(mapUtils)
app.use(router)
app.use(baiduMap)
app.use(AddCodeGate)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
