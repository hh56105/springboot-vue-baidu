import { createApp } from 'vue'
import router from './index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import 'lib-flexible'
import axios from 'axios'
<<<<<<< HEAD
=======
// import mapUtils from './util/mapUtils.js'
import './assets/static/baidu-map/apiv.2.0.js'
import './assets/static/baidu-map/library/MarkerClusterer_min.js'
import './assets/static/baidu-map/library/DrawingManager.js'
import './assets/static/baidu-map/library/DrawingManager_min.css'
import './assets/static/baidu-map/library/LuShu_min.js'
>>>>>>> 8b82786abbb60f27e81eedc151c9313db97b8478
import AddCodeGate from './components/AddCodeGate.vue'
import baiduMap from './components/BMapMarker.vue'
import { ElMessage } from 'element-plus'

const app = createApp(App) // 创建实例
app.config.globalProperties.$axios = axios
app.provide('$message', ElMessage)
// app.use(mapUtils)
app.use(router)
app.use(baiduMap)
app.use(AddCodeGate)
app.use(ElementPlus)
app.mount('#app')
