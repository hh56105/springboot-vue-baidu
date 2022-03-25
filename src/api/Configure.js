/* eslint-disable no-unused-vars */
import http from "@/utils/http"
const api = {}
// 解封
api.recover = data => {
    return http.post("/system/sysRedBlackList/updateStatus", data)
    // return http.get("/system/sysRedBlackList/autoApproval", data)
}
// 红名单列表
api.getRedList = data => {
    return http.post("/system/sysRedBlackList/redList", data)
}
// 黑名单列表
api.getBlackList = data => {
    return http.post("/system/sysRedBlackList/blackList", data)
}
// 红名单删除
api.deleteRedList = data => {
    return http.get(`/system/sysRedBlackList/delete/${data}`)
}
// 红名单详情
api.info = data => {
    return http.get(`/system/sysRedBlackList/info/${data}`)
}
// 红名单保存
api.add = data => {
    return http.post(`/system/sysRedBlackList/save`, data)
}
// 红名单审批
api.approval = data => {
    return http.post(`/system/sysRedBlackList/permission`, data)
}
// 号牌种类
api.carNumType = () => {
    return http.get(`/system/api/common/code/list/030107`)
}
// 车辆类型
api.carType = () => {
    return http.get(`/system/api/common/code/list/030104`)
}
// 号牌颜色
api.carColorType = () => {
    return http.get(`/system/api/common/code/list/031001`)
}
// 卡口类型
api.kkType = () => {
    return http.get(`/system/api/common/code/list/150000`)
}

/*
    标签库管理接口
*/
/* 卡口标签 */
// 获取卡口标签分页列表
api.getkkList = data => {
    return http.post("/tag/getCodeGateTagPageList", data)
}
// 获取卡口标签数目详情
api.getCodeGateListDetail = data => {
    return http.post("/tag/getCodeGateListDetail", data)
}
// 获取卡口标签类型接口
api.getkkLabel = () => {
    return http.get("/tag/getCodeGateType")
}
// 获取卡口标签类型接口
api.getCodeGateListByRegion = data => {
    return http.post("/tag/getCodeGateListByRegion", data)
}
// 更新当前标签状态
api.updateTagStatus = data => {
    return http.post("/tag/updateTagStatus", data)
}
//标签添加-修改
api.editCodeGateTag = data => {
    return http.post("/tag/editCodeGateTag", data)
}
//卡口标签页面EXCEL上传
api.uploadTemplate = data => {
    const file = new FormData()
    file.append("file", data.file)
    return http.post("/tag/exportExcel", file)
}
//--卡口标签删除
api.deleteKkLabel = data => {
    return http.get(`/tag/deleteTagCodeGate/${data}`)
}

/* 车辆标签 */
// 各个标签车辆数量
api.getTagCountPage = data => {
    return http.post("/tag/getTagCountPage", data)
}
// 添加标签
api.addTag = data => {
    return http.post("/tag/add", data)
}
// 获取车辆标签各个类型数量
api.getTagsCount = data => {
    return http.get("/tag/getTagsCount", data)
}
// 添加标签
api.updateTag = data => {
    return http.post("/tag/updateTag", data)
}
// 删除标签
api.deleteTag = data => {
    return http.post(`/tag/delete/${data}`)
}
// 根据标签名获取车辆档案分页
api.getCarArchives = data => {
    return http.post("/archive/carArchive/getCarArchives", data)
}
export default api
