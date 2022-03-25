/*
 * @Author: your name
 * @Date: 2020-12-09 09:09:48
 * @LastEditTime: 2021-11-08 11:27:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dev\front-vue\src\api\user.js
 */

import request from "@/utils/request"
import http from "../utils/http"
import qs from "qs"
/**
 * 获取用户信息
 */
export function login(data) {
    return request({
        url: "/st/login",
        method: "post",
        data
    })
}
// 湖南二期登录
export function login2(data) {
    return request({
        url: "/auth/login",
        method: "post",
        data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" //配置请求头
        }
    })
}

/**
 * 获取TIP Token信息
 */
export function getInfo() {
    return request({
        url: "/st/getSysUserInfo",
        method: "get"
    })
}
export function pkiLogin(data) {
    return request({
        url: "/auth/pki/login",
        method: "post",
        data: qs.stringify(data),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded" //配置请求头
        }
    })
}

export default class {
    static successLogin(data) {
        http.get(`/system/user/success/${data}`)
    }
}
