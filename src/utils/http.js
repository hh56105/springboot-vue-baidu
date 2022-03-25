import axios from 'axios'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = '/apis'

axios.interceptors.response.use((res) => {
  if (res.status === 200 || res.code === 200) {
    return Promise.resolve(res)
  } else {
    alert(res.msg)
  }
  return res
}, (error) => {
  return Promise.reject(error)
})
export function axiosPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export function axiosGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param
    })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  axiosPost,
  axiosGet
}
