import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import wrongPages from '@/components/wrongPages'
const routes = [
  {
    path: '/',
    name: 'pages',
    component: () => import('@/components/CodePages')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('@/components/AddCodeGate')
  },
  {
    path: '/index',
    name: 'APP',
    redirect: '/pages'
  },
  {
    path: '/*',
    name: 'notfount',
    component: wrongPages
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

const service = axios.create({
  // 设置超时时间
  timeout: 60000
})

service.interceptors.response.use(response => {
  const responseCode = response.status
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      console.log('超时了')
      ElMessage.error('请求超时，请检查网络是否连接正常')
    } else {
      // 可以展示断网组件
      ElMessage.log('断网了')
      ElMessage.error('请求失败，请检查网络是否已连接')
    }
    return
  }
  return Promise.reject(error)
})
