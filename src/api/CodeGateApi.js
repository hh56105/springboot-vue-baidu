
/* eslint-disable no-unused-vars */
import http from "@/util/http.js"
const api = {}
//卡口页面EXCEL上传
api.uploadTemplate = data => {
  const file = new FormData()
  file.append("file", data.file)
  return http.axiosPost("/exportExcel", file)
}