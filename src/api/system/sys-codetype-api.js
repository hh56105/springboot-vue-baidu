import http from "@/utils/http"

const sysCodetypeApi = {}

sysCodetypeApi.detail = (id) => {
    return http.get(`st/api/codetype/info/${id}`)
}

sysCodetypeApi.add = (data) => {
    return http.post("st/api/codetype/add", data)
}

sysCodetypeApi.update = (data) => {
    return http.post("st/api/codetype/update", data)
}

sysCodetypeApi.delete = (id) => {
    return http.post(`st/api/codetype/delete/${id}`)
}

sysCodetypeApi.getPageList = (data) => {
    return http.post("st/api/codetype/getPageList", data)
}

export default sysCodetypeApi
