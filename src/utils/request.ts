import axios from 'axios'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 150000
})

service.interceptors.request.use(
  (config) => {
    // 判断store是否存在token
    if (UserModule.token) {
      // 存在token就在请求携带token
      config.headers.Authorization = 'Bearer ' + UserModule.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
