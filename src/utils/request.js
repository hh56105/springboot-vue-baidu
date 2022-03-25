import axios from "axios"
// import { getToken, removeToken } from "./cookies"
// 使用element-ui Message做消息提醒
import router from "@/index"
axios.defaults.withCredentials = true
//1. 创建新的axios实例，
const service = axios.create({
    // 公共接口--这里注意后面会讲
    baseURL: "/apis",
    withCredentials: true,
    // 超时时间 单位是ms，这里设置了5s的超时时间
    timeout: 50 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(
    config => {
        // console.log('config', config)
        // if (!config.headers['Content-type']) {
        //   config.headers["Content-Type"] = "application/json";
        // }
        // else {
        //   config.headers = {
        //     // 'Content-Type': 'application/x-www-form-urlencoded', //配置请求头
        //     // 'Accept': 'application/json, text/plain, */*'
        //     "Content-Type": "application/json",
        //   };
        // }

        // 获取token
        // const token = getToken()
        // if (token) {
        //     config.headers.Authorization = token
        // }
        config.headers["X-Requested-With"] = "XMLHttpRequest"
        return config
    },
    error => {
        Promise.reject(error)
    }
)
// 3.响应拦截器
service.interceptors.response.use(
    response => {
        //接收到响应数据并成功后的一些共有的处理，关闭loading等
        const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel;charset=utf-8"
        })
        if (
            response.data.code === 200 ||
            response.data.resultCode === "0" ||
            response.data.status === 200 ||
            blob
        ) {
            return {
                ...response,
                datas: response.data.data
            }
        } else {
            this.$message.error(response.data.message)
            return response
        }
    },
    error => {
        /***** 接收到异常响应的处理开始 *****/
        switch (error.response.status) {
            case 400:
                error.message = "错误请求"
                break
            case 401:
                if (error.response.headers.contextpath) {
                    removeToken()
                    window.location.href = error.response.headers.contextpath
                }
                error.message = "用户登录信息过期，请重新登录"
                removeToken()
                if (process.env.NODE_ENV == "development") {
                    router.replace({ path: "/msglogin" })
                } else {
                    router.replace({ path: "/login" })
                }
                break
            case 403:
                if (error.response.headers.contextpath) {
                    removeToken()
                    window.location.href = error.response.headers.contextpath
                }
                error.message = "无权限使用，请联系管理员添加"
                break
            case 404:
                error.message = "请求错误,未找到该资源"
                break
            case 405:
                error.message = "请求方法未允许"
                break
            case 408:
                error.message = "请求超时"
                break
            case 500:
                if (error.response.headers.contextpath) {
                    removeToken()
                    window.location.href = error.response.headers.contextpath
                }
                break
            case 501:
                error.message = "网络未实现"
                break
            case 502:
                error.message = "网络错误"
                break
            case 503:
                error.message = "服务不可用"
                break
            case 504:
                error.message = "网络超时"
                break
            case 505:
                error.message = "http版本不支持该请求"
                break
            default:
                error.message = `连接错误${error.response.message}`
        }
        Message.error(error.message)
    }
)
//4.导入文件
export default service
