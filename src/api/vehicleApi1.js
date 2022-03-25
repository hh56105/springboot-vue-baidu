import http from "../utils/http1"
import http1 from "../utils/http"
import request from '@/utils/request1'
import request1 from '@/utils/request'

export default class {
    /* -----同轨寻车----- */
    // 源车经过卡口数据
    static yuancData(params) {
        return http.post("/yp/tgxcresult/info", params)
    }
    // 创建任务接口
    static createTask(params) {
        return http.post("/yp/tgxctask/createTask", params)
    }
    // 删除任务接口
    static DeleteTask(params) {
        return http.post("/yp/tgxctask/delete", params)
    }
    // 任务列表分页查询
    static pageTask(params) {
        return http.post("/yp/tgxctask/page", params)
    }
    // 单辆车详情信息列表
    static DetailTask(params) {
        return http.post("/yp/tgxcresult/detail", params)
    }
    // 车档的接口
    static carTask(params) {
        return http.post("/yp/tgxctask/doc", params)
    }
    // 号牌种类
    // static getCaseType(data) {
    //     return http1.get("/task/common/code/list/030107", data)
    // }
    static getCaseType(data) {
        return http.get("/system/api/common/code/list/030107", data)
    }
    // 号牌种类
    static getColorType(data) {
        return http1.get("/task/common/code/list/030108", data)
    }
    /* --------同行车------ */
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
    static getPoinstName(params) {
        return http.get("/vs/api/rest/device/list", params)
    }
    /* ---------任务管理------- */
    // 全部任务分页列表
    static getAllManage(params) {
        return http1.post("/task/task/query", params)
    }
    // 我的任务分页列表
    static getmyManage(params) {
        return http1.post("/task/task/queryUserTask", params)
    }
    // 时空碰撞类型分页列表
    static getTAManage(params) {
        return http1.post("/task/task/queryTimeAreaTask", params)
    }
    // 同轨寻车分页列表
    static getTgxcManage(params) {
        return http1.post("/task/task/querySameTrackTask", params)
    }
    // 任务管理数据删除
    static deleteManage(params) {
        return http1.delete(`/task/task/deleteTask/` + params.tid + `/` + params.type)
    }
    // 任务管理重新执行
    static angainManage(tid, type) {
        return http1.put(`/task/task/execute/again/${tid}/${type}`)
    }
    // 数据分页列表
    static getListManage(params) {
        return http1.post("/task/task/query", params)
    }

    // 时空碰撞类型删除
    static tAManageDelete(id) {
        return http.post(`/api/common/code/delete/${id}`)
    }

    // 时空碰撞
    // 1新增
    static skpzExecute(data) {
        return http1.post("/task/task/add", data)
        // return http.post("/task/task/add", data)
    }

    // 查询
    static skpzList(data) {
        return http.post("/ta/api/timearea/list", data)
    }
    // 详情
    static skpzDetail(data) {
        return http.post("/ta/api/timearea/detail", data)
    }

    // 重新执行
    static reDone(data) {
        return http1.post(`/task/task/update`, data)
    }
    // 删除
    static delTAManage(params) {
        // return http.post(`/task/task/deleteTask/${id}`)
        return http1.delete(`/task/task/deleteTask/` + params.id + `/` + params.type)
    }
    // 详情
    static getTAManageById(id) {
        return http1.post(`/task/task/getTrackParams/${id}`)
    }
    //  获取json列表
    // static assetsHPGSD() {
    //     return http.get(`/assets/json/HPGSD.json`)
    // }
    //  获取json列表
    static resultPeer(data) {
        return http1.post(`/task/task/result/peer`, data)
    }
    // 导出
    // static peerExport(data) {
    //     return http.post(`/task/task/result/peer/export`, data)
    // }
    // 导出
    static peerExport(data) {
        return request1({
            url: '/task/task/result/peer/export',
            method: 'post',
            data,
            responseType: 'arraybuffer'
        })
    }
    // 详情
    static peerDetail(tid) {

        return http1.get(`/task/task/peer/result/detail/${tid}`)
    }
    // static Export(params) {
    //     return http.post("/api/accAnalysis/export", params)
    // }

    // 高新兴导出
    static Export(data) {
        return request({
            url: '/vaa/api/accAnalysis/export',
            method: 'post',
            data,
            responseType: 'arraybuffer'
        })
    }

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
    // 轨迹查询——号牌查询——导出接口
    static searchExport(data) {
        return request({
            url: '/track/export',
            method: 'post',
            data,
            responseType: 'arraybuffer'
        })
    }
    // 时空碰撞导出
    static timeareEexport(data) {
        return request({
            url: '/api/timearea/export',
            method: 'post',
            data,
            responseType: 'arraybuffer'
        })
    }
}
