import http from '@/utils/http'

const sysCodeApi = {

}

sysCodeApi.detail = id => {
    return http.get(`st/api/common/code/info/${id}`)
}


sysCodeApi.add = data => {
    return http.post('st/api/code/add', data)
}


sysCodeApi.update = data => {
    return http.post('st/api/code/update', data)
}


sysCodeApi.delete = data => {
    return http.post('st/api/code/delete', data)
}

sysCodeApi.saveData = data => {
    return http.post('st/api/code/savaData', data)
}

sysCodeApi.getPageList = data => {
    return http.post('st/api/code/getPageList', data)
}

export default sysCodeApi

