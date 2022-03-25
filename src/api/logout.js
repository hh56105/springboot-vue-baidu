/*
 * @Author: your name
 * @Date: 2020-12-09 09:09:48
 * @LastEditTime: 2021-11-08 11:23:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dev\front-vue\src\api\logout.js
 */

import request from "@/utils/request"

// export function logout() {
//   return request({
//     url: '/api/logout',
//     method: 'post'
//   })
// }

export function cloudLogout() {
    return request({
        url: '/st/cloud/logout',
        method: 'post'
    })
}
