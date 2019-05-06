import axios from 'axios'
import { getToken } from './token'

const service = axios.create({
  baseURL: 'http://47.107.147.152:82/',
  withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (config.method === 'get' || config.permit) {
      return config
    }
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default service
