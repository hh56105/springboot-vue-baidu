import http from "@/utils/http"
import http1 from "@/utils/http1"
import qs from 'qs'

const sysDepartmentApi = {}

/**
 * 获取系统部门列表
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.getPageList = (data) => {
    return http1.get("/api/system/dept/list", data)
}

/**
 * 获取部门、用户总数
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.getTotal = () => {
    return http.get("/system/portal/system/total")
}


/**
 * 新增系统部门
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.add = (data) => {
    return http.post("/system/dept", qs.stringify(data), "application/x-www-form-urlencoded")
}

/**
 * 修改系统部门
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.update = (data) => {
    return http.put("/system/dept", data)
}

/**
 * 删除系统部门
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.delete = (id) => {
    return http.delete(`/system/dept/${id}`)
}

/**
 * 获取系统部门列表
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.getDepartmentTree = (data) => {
    return http.get("/system/dept/tree", data)
}

/**
 * 系统部门详情
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.detail = (id) => {
    return http.get(`/st/sysDepartment/info/${id}`)
}

/**
 * 获取所有父级部门(一级/二级部门)
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.getNavDeptTree = () => {
    return http.post("/st/sysDepartment/getNavDeptTree")
}

/**
 * 根据层级和行政区划代码来同步部门
 * @param data
 * @returns {AxiosPromise}
 */
sysDepartmentApi.syncDept = (data) => {
    return http.post("/st/sysDepartment/syncdept", data)
}

export default sysDepartmentApi
