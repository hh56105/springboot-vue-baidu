import request from "@/utils/request"

/* -----获取驾驶证图片信息----- */
export function getCarUserLin(data) {
    return request({
        url: "/archive/carArchive/getCarUserLin",
        method: "post",
        data
    })
}
/* -----获取车辆信息----- */
export function carInfo(data) {
    return request({
        url: "/archive/carArchive/carInfo",
        method: "post",
        data
    })
}
/* -----过户登记信息----- */
export function getCarUsers(data) {
    return request({
        url: "/archive/carArchive/getCarUsers",
        method: "post",
        data
    })
}
/* -----市场分析信息----- */
export function getCarPrice(data) {
    return request({
        url: "/archive/carArchive/getCarPrice",
        method: "post",
        data
    })
}
/* -----获取车辆布控信息----- */
export function getRoundInfo(data) {
    return request({
        url: "/archive/roungControl/getRoundInfo",
        method: "post",
        data
    })
}
/* -----获取涉案信息----- */
export function getCarInCase(data) {
    return request({
        url: "/archive/carLawCase/getCarInCase",
        method: "post",
        data
    })
}
/* -----获取交通违法记录信息----- */
export function breakTheLaw(data) {
    return request({
        url: "/archive/carTrafficFine/breakTheLaw",
        method: "post",
        data
    })
}
/* -----获取罚款缴费信息----- */
export function carFineInfo(data) {
    return request({
        url: "/archive/carTrafficFine/carFineInfo",
        method: "post",
        data
    })
}
/* -----获取车主信息----- */
export function userinfo(data) {
    return request({
        url: "/archive/carUser/userinfo",
        method: "post",
        data
    })
}
/* -----获取住宿记录----- */
export function userStay(data) {
    return request({
        url: `/archive/carUser/userStay/${data}`,
        method: "get"
    })
}
/* -----获取同户籍及关系人----- */
export function userTh(data) {
    return request({
        url: `/archive/carUser/userTh/${data}`,
        method: "get",
        data
    })
}
/* -----获取出入境记录----- */
export function userIo(data) {
    return request({
        url: `/archive/carUser/userIo/${data}`,
        method: "get",
        data
    })
}
/* -----获取交通出行记录----- */
export function userTfTrack(data) {
    return request({
        url: `/archive/carUser/userTfTrack/${data}`,
        method: "get",
        data
    })
}
/* -----获取手机轨迹----- */
export function userPhTrack(data) {
    return request({
        url: `/archive/carUser/userPhTrack/${data}`,
        method: "get",
        data
    })
}
/* -----根据对象获取所有标签----- */
export function labelList(data) {
    return request({
        url: "/tag/list",
        method: "post",
        data
    })
}
/* -----获取数据库标签----- */
export function labelCode(data) {
    return request({
        url: "/tag/code",
        method: "post",
        data
    })
}
/* -----新增手动ES标签----- */
export function manualAdd(data) {
    return request({
        url: "/tag/manual/add",
        method: "post",
        data
    })
}
/* -----删除手动标签----- */
export function manualDel(data) {
    return request({
        url: "/tag/manual/del",
        method: "post",
        data
    })
}

/* -----获取车辆档案总数----- */
export function getAchiveCount() {
    return request({
        url: "/archive/carArchive/getAchiveCount",
        method: "get"
    })
}

/* -----获取车辆档案分页查询----- */
export function getAchivePage(data) {
    return request({
        url: "/archive/carArchive/getAchivePage",
        method: "post",
        data
    })
}

/*  --------车辆档案标签详情--------- */
export function getCarDocAndTagInfo(data) {
    return request({
        url: "/archive/carArchive/carDocAndTagInfo",
        method: "post",
        data
    })
}
/* 根据标签类型获取数据库标签集合 */
export function getTagByType(data) {
    return request({
        url: "/tag/code",
        method: "post",
        data
    })
}
