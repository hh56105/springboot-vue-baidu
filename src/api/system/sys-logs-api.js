import http from "@/utils/http"

const sysLogsApi = {}

/**
 * 获取系统所有日志列表
 * @param data
 * @returns {AxiosPromise}
 */
sysLogsApi.getPageList = (data) => {
    return http.post("st/sysLogs/getPageList", data)
}

// 获取日志操作类型
sysLogsApi.getType = (data) => {
    return http.get("st/api/common/code/list/100034", data)
}

/**
 * 分页查询登录日志
 * @param data
 * @returns {AxiosPromise}
 */
sysLogsApi.getLoginLog = (data) => {
    return http.get(`/system/loginLog/page`, data)
}

/**
 * 删除登录日志
 * @param data
 * @returns {AxiosPromise}
 */
sysLogsApi.deleteLoginLog = (data) => {
    return http.delete(`/system/loginLog/${data}`)
}

/**
 * 分页查询操作日志
 * @param data
 * @returns {AxiosPromise}
 */
sysLogsApi.getLog = (data) => {
    return http.get(`/system/log/page`, data)
}

/**
 * 删除操作日志
 * @param data
 * @returns {AxiosPromise}
 */
sysLogsApi.deleteLog = (data) => {
    return http.delete(`/system/log/${data}`)
}

export default sysLogsApi
