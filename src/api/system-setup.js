/*
 * @Author: your name
 * @Date: 2021-10-28 17:29:44
 * @LastEditTime: 2021-11-08 11:23:54
 * @LastEditors: Please set LastEditors
 * @Description: 系统设置模块所有接口
 * @FilePath: \front-vue\src\api\system-setup.js
 */
import http from "@/utils/http"
// 分页查询数据角色--帅帅
export function getDataRoleList(data) {
    return http.get("/system/dataRole/page", data)
}
// 新增数据角色--帅帅
export function addDataRole(data) {
    return http.post("/system/dataRole", data)
}
// 新增数据角色获取部门树--帅帅
export function getDeptTree(data) {
    return http.get("/system/dept/tree", data)
}
//修改数据角色--帅帅
export function updateDataRole(data) {
    return http.put2("/system/dataRole", data, "application/json")
}
// 删除据角色--帅帅
export function delDataRole(params) {
    return http.delete(`/system/dataRole/${params}`)
}
// 删除据角色--帅帅
export function getDataList(data) {
    return http.get(`/system/dataRole/list`, data)
}
