/*
 * @Author: your name
 * @Date: 2021-09-22 11:08:40
 * @LastEditTime: 2021-11-08 11:23:23
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-vue\src\api\index.js
 */
import http from "@/utils/http"
const Api = {}

/**
 * 获取最新5条的待办任务
 * @param data
 * @returns {AxiosPromise}
 */
Api.getNewestTask = data => {
    return http.get(`/system/SysShowMess/getNewestTask/${data}`)
}
/**
 * 获取当前用户所有待办任务
 * @param data
 * @returns {AxiosPromise}
 */
Api.getAllAwaitByUser = data => {
    return http.post("/system/SysShowMess/getAllAwaitByUser", data)
}
/**
 * 获取最新5条的日志
 * @param data
 * @returns {AxiosPromise}
 */
Api.getNewestLogs = data => {
    return http.get(`/system/SysShowMess/getNewestLogs/${data}`)
}
/**
 * 日志分页展示
 * @param data
 * @returns {AxiosPromise}
 */
Api.getLogPageList = data => {
    return http.post("/system/SysShowMess/getLogPageList", data)
}
/**
 * 获取最新5条预警消息
 * @param data
 * @returns {AxiosPromise}
 */
Api.getNestAlarmMess = data => {
    return http.get(`/system/SysShowMess/getNestAlarmMess/${data}`)
}
/**
 * 预警消息列表
 * @param data
 * @returns {AxiosPromise}
 */
Api.getAlarmMessPageList = data => {
    return http.post("/system/SysShowMess/getAlarmMessPageList", data)
}
// 预警消息已读状态更改
Api.changeStatus = data => {
    return http.post("/system/SysShowMess/updateInformation", data)
}

// 根据id删除搜索记录
Api.delSearchHistory = data => {
    return http.get(`/system/deleteSearchHistoryList/${data}`)
}
// 获取用户搜索记录-返回前十条
Api.getSeachHistory = data => {
    return http.get(`/system/getSearchHistoryList/`, data)
}
Api.addSearchHistory = data => {
    return http.post("/system/addSearchHistory", data)
}
export default Api
