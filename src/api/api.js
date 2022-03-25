/*
 * @Author: your name
 * @Date: 2020-12-01 14:03:57
 * @LastEditTime: 2020-12-14 18:55:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-vue\src\api\api.js
 */
import http from '../utils/http'

export default class {
    // 涉毒人员默认上点
    static markSdry(params) {
        return http.post(`/sdfx/sdPerson/sdPersonList`, params)
    }
    // 涉毒案件默认上点
    static markSdaj(params) {
        return http.post(`/sdfx/sdCase/sdCaseList`, params)
    }
    // 派出所默认上点
    static markPcs(params) {
        return http.post(`/sdfx/policeStation/sdPoliceStationList`, params)
    }
    // 获取用户信息
    static getInfo(params) {
        return http.get(`/st/getSysUserInfo`, params)
    }
    // 高级搜索-案件搜索
    static getAjList(params) {
        return http.post(`/sdfx/sdPerson/getGjPageList`, params)
    }
    // 高级搜索-案件搜索结果-导出
    static AjExport(data) {
        return http.export('/sdfx/sdCase/sdCaseCount/export/?ssqx=' + data.ssqx + '&jssj=' + data.jssj + '&fasj=' + data.fasj)
    }
    // 水印图片
    static getWarter(params) {
        return http.get(`/sdfx/rest/watermark/get`, params)
    }
}
