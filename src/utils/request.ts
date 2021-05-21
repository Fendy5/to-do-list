import axios from 'axios'
import { UserModule } from '@/store/modules/user'
import { Notify } from 'quasar'

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


service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 0 && res.message) {
      Notify.create({
        type: 'positive',
        position: 'top',
        message: res.message
      })
    } else if (res.code === 1) {
      Notify.create({
        type: 'negative',
        position: 'top',
        message: res.message
      })
      // return Promise.reject(res)
    }
    return res
  },
  (error) => {
    Notify.create({
      type: 'negative',
      position: 'top',
      message:  error.message
    })
    return Promise.reject(error)
  }
)

export default service
