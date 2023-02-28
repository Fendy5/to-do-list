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
    // code-0,请求成功；code-1，未登录；code-2,服务器返回失败信息
    if (res.code === 0) {
      res.message && Notify.create({
        type: 'positive',
        position: 'top',
        message: res.message
      })
      return res
    } else if (res.code === 1 || res.code === 2) {
      Notify.create({
        type: 'negative',
        position: 'top',
        message: res.message
      })
      if (res.code === 1) {
        setTimeout(() => {
          UserModule.ResetToken()
          window.location.href = '/login'
        }, 1000)
      }
      return Promise.reject(res)
    }
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
