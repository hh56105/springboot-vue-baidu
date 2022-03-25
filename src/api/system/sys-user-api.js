import http from "@/utils/http"
import qs from "qs"
const sysUserApi = {}

/**
 * 获取系统用户分页列表
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.getPageList = (data) => {
    return http.get("/system/user/page", data)
}

/**
 * 校验用户
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.checkUser = (data) => {
    return http.get(`/system/user/check/`, data)
}

/**
 * 新增系统用户
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.add = (data) => {
    return http.post("/system/user", qs.stringify(data), "application/x-www-form-urlencoded")
}

/**
 * 修改系统用户
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.update = (data) => {
    return http.put("/system/user", data)
}

/**
 * 删除系统用户
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.delete = (id) => {
    return http.delete(`/system/user/${id}`)
}

/**
 * 重置用户密码
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.resetPassword = (data) => {
    return http.put("/system/user/password/reset", data)
}

/**
 * 修改用户信息
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.resetPassword = (data) => {
    return http.put("/system/user/profile", data)
}

/**
 * 用户登录成功保存登录日志
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.saveLog = (data) => {
    return http.get("/system//user/success", data)
}

/**
 * 系统用户详情
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.detail = (id) => {
    return http.get(`/st/sysUser/info/${id}`)
}

/**
 * 同步用户
 * @param data
 * @returns {AxiosPromise}
 */
sysUserApi.syncUser = (data) => {
    return http.post("st/sysUser/syncuser", data)
}
// 修改用户权限
sysUserApi.updateSysRolePermission = (data) => {
    return http.post("/st/sysUser/updateSysRolePermission", data)
}

export default sysUserApi
