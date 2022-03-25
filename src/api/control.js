/*
 * @Author: your name
 * @Date: 2021-09-22 11:08:40
 * @LastEditTime: 2021-11-08 11:22:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-vue\src\api\control.js
 */
import http1 from "@/utils/http1"
// import http from "@/utils/http"
import qs from "qs"

const api = {}

// 审核列表接口
api.getList = data => {
    return http1.post(
        `/sp/api/sus/query/task_list`,
        qs.stringify(data),
        "application/x-www-form-urlencoded"
    )
}

// 车辆布控列表接口
api.getCarList = data => {
    return http1.post(`/sp/api/management/getList`, data)
}

// 车辆布控新增接口
api.addCarbk = data => {
    return http1.post(`/sp/api/sus/act/add_bk`, data)
}

// 车辆布控--图片上传接口
// api.CarbkPhoto = (data) => {
//     return http1.post(`/sp/api/sus/pic/upload`, data, 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq')
// }
api.CarbkPhoto = data => {
    return http1.post(`/sp/api/sus/pic/upload`, data, "multipart/form-data")
}

// 车辆布控查看详情接口
api.Carbkdetail = data => {
    return http1.get(`/sp/api/sus/query/detail/${data}`)
}

// 车辆布控删除接口
api.Carbkdel = data => {
    return http1.post(`/sp/api/management/delete`, data)
}

// 审核提交接口
api.exaSumbit = data => {
    return http1.post(`/sp/api/sus/act/audit`, data)
}

// 续控审核提交接口
api.exaSumbitXK = data => {
    return http1.post(`/sp/api/sus/act/continued/audit`, data)
}

// 审批提交接口
api.appSumbit = data => {
    return http1.post(`/sp/api/sus/act/approve`, data)
}

// 续控审批提交接口
api.appSumbitXK = data => {
    return http1.post(`/sp/api/sus/act/continueds/approve`, data)
}

// 提交撤控接口
api.CarCk = data => {
    return http1.post(`/sp/api/sus/act/add_ck`, data)
}

// 提交续控接口
api.CarXk = data => {
    return http1.post(`/sp/api/sus/act/add_xk`, data)
}

export default api
