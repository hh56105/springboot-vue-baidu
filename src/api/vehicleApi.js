import http from "../utils/http"
import request from "@/utils/request"
export default class {
    static getRegionTree(data) {
        return request({
            url: "/system/api/common/code/regionTree",
            method: "post",
            data
        })
    }
    // 号牌种类
    static getCaseType(data) {
        return http.get("/system/api/common/code/list/030107", data)
    }
    // 车辆品牌
    static getCarType(data) {
        return http.get("/system/api/common/code/list/000055", data)
    }
    // 号牌颜色
    static getColorType(data) {
        return http.get("/system/api/common/code/list/030108", data)
    }
    // 任务状态 120008
    static getTaskType(data) {
        return http.get("/system/api/common/code/list/120008", data)
    }
    // 布控类型
    static getBulxType(data) {
        return http.get("/system/api/common/code/list/200011", data)
    }
    /* --------同行车(高新兴不用改)------ */
    // 搜索接口
    static getAccompanyList(data) {
        return http.post("/vaa/api/accAnalysis/getAccompanyList", data)
    }
    // 详情
    static getAccompanyDetail(data) {
        return http.post("/vaa/api/accAnalysis/getAccompanyDetail", data)
    }
    static getCarInfo(params) {
        return http.get("/vaa/api/accAnalysis/getCarInfo", params)
    }
    static getPointList(params) {
        return http.get("/vs/api/rest/device/locate/square/list", params)
    }
    static pointList(params) {
        // return http.post("/system/sysSelectPoint/getKKList")
        return http.post("/system/sysSelectPoint/getPointList", params)
    }
    static getPoinstName(params) {
        return http.get("/vs/api/rest/device/list", params)
    }
    /* ---------任务管理------- */
    // 全部任务分页列表
    static getAllManage(params) {
        return http.post("/task/query", params)
    }
    // 我的任务分页列表
    static getmyManage(params) {
        return http.post("/task/queryUserTask", params)
    }
    // 时空碰撞类型分页列表
    static getTAManage(params) {
        return http.post("/task/queryTimeAreaTask", params)
    }
    // 同轨寻车分页列表
    static getTgxcManage(params) {
        return http.post("/task/querySameTrackTask", params)
    }
    // 任务管理数据删除
    static deleteManage(params) {
        return http.delete(`/task/deleteTask/` + params.tid + `/` + params.type)
    }
    // 任务管理重新执行
    static angainManage(tid, type) {
        return http.put(`/task/task/execute/again/${tid}/${type}`)
    }
    // 数据分页列表
    static getListManage(params) {
        return http.post("/task/task/query", params)
    }

    // 时空碰撞类型删除
    static tAManageDelete(id) {
        return http.post(`/api/common/code/delete/${id}`)
    }

    // 重新执行
    static reDone(data) {
        return http.post(`/task/update`, data)
    }
    // 删除
    static delTAManage(params) {
        // return http.post(`/task/deleteTask/${id}`)
        return http.delete(`/task/deleteTask/` + params.id + `/` + params.type)
    }
    //  获取json列表
    static resultPeer(data) {
        return http.post(`/task/result/peer`, data)
    }
    // 导出
    // static peerExport(data) {
    //     return http.post(`/task/result/peer/export`, data)
    // }
    // 导出
    // 详情
    static peerDetail(tid) {
        return http.get(`/task/peer/result/detail/${tid}`)
    }
    // static Export(params) {
    //     return http.post("/api/accAnalysis/export", params)
    // }

    // 首页过车情况
    static passCarData(params) {
        return http.get("/track/portal/province/pass/car", params)
    }
    // 首页全省卡口情况
    static kkProvinceData(params) {
        return http.get("/track/portal/province/tollgate", params)
    }
    // 首页全省实时过车量
    static hourPassData(params) {
        return http.get("/track/portal/province/pass/car/hour", params)
    }
    // 轨迹查询——号牌查询
    static searchData(params) {
        return http.post("/track/search", params)
    }
    // 根据字典类别获取字典列表
    static getCaseTypeList(data) {
        return http.get(`/system/api/common/code/list/${data}`)
    }

    // 根据布控类别获取小类,布控性质,布控级别,报警预案
    static getSuspType(data) {
        return http.get(`/system/api/common/code/getSuspType/${data}`)
    }
}
