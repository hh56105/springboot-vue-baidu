import http from "@/utils/http"
import qs from "qs"

const sysPermissionApi = {}

/**
 * 获取系统所有树形菜单
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.getAllMenuTree = () => {
    return http.post("/st/sysPermission/getAllMenuTree")
}

/**
 * 获取系统部门列表
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.detail = (id) => {
    return http.get(`/st/sysPermission/info/${id}`)
}

/**
 * 根据角色id获取该对应的所有权限ID
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.getMenuIdsByRoleId = (roleId) => {
    return http.get(`/st/sysPermission/getChildIdsByRoleId/${roleId}`)
}

/**
 * 获取所有导航菜单(一级/二级菜单)
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.getNavMenuTree = () => {
    return http.post("/st/sysPermission/getNavMenuTree")
}

/**
 * 添加菜单
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.add = (data) => {
    return http.post(
        "/system/menu",
        qs.stringify(data),
        "application/x-www-form-urlencoded"
    )
}

/**
 * 修改菜单
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.update = (data) => {
    return http.put("/system/menu", data)
}

/**
 * 删除菜单
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.delete = (id) => {
    return http.delete(`/system/menu/${id}`)
}

/**
 * 根据用户名获取路由
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.getRouter = (data) => {
    return http.get(`/system/menu/${data}`)
}

/**
 * 查询菜单树
 * @param data
 * @returns {AxiosPromise}
 */
sysPermissionApi.getMenuTree = (data) => {
    return http.get(`/system/menu/tree`, data)
}
export default sysPermissionApi
