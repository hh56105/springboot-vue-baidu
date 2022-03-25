import http from "@/utils/http"
import qs from "qs"

const sysRoleApi = {}

/**
 * 获取角色列表
 * @param data
 * @returns {AxiosPromise}
 */
sysRoleApi.getList = (data) => {
    return http.get("/system/role/page", data)
}

/**
 * 添加角色权限
 * @param data
 * @returns {AxiosPromise}
 */
sysRoleApi.setPermission = (data) => {
    return http.put2("/system/role", qs.parse(data), "application/json")
}

/**
 * 添加角色
 * @param data
 * @returns {AxiosPromise}
 */
sysRoleApi.add = (data) => {
    return http.post("/system/role", data)
    // return http.post("/system/role", qs.stringify(data),'application/x-www-form-urlencoded');
}

/**
 * 删除角色
 * @param data
 * @returns {AxiosPromise}
 */
sysRoleApi.delete = (roleIds) => {
    return http.delete(`/system/role/${roleIds}`)
}



/**
 * 获取系统部门列表
 * @param data
 * @returns {AxiosPromise}
 */
sysRoleApi.getPageList = (data) => {
    return http.post("/st/sysRole/getPageList", data)
}

/**
 * 获取系统部门列表
 * @param data
 * @returns {AxiosPromise}
 */
sysRoleApi.detail = (id) => {
    return http.get(`/st/sysRole/info/${id}`)
}

/**
 * 修改角色
 * @param data
 * @returns {AxiosPromise}
 */
sysRoleApi.update = (data) => {
    return http.post("/st/sysRole/update", data)
}

/**
 * 修改系统角色权限
 * @param data
 * @returns {AxiosPromise}
 */
sysRoleApi.updateSysRolePermission = (data) => {
    return http.post("/st/sysRole/updateSysRolePermission", data)
}

export default sysRoleApi
