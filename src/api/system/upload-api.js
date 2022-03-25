import http from "@/utils/http"

const uploadApi = {}

/**
 * 上传文件
 * @param data
 * @returns {AxiosPromise}
 */
uploadApi.upload = (data) => {
    return http.upload("/upload", data)
}

export default uploadApi
