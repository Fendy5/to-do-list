import axios from 'axios'
import { UserModule } from '@/store/modules/user'
import { Notify } from 'quasar'
import router from '@/router'
import { getToken } from '@/utils/cookies'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true,
  timeout: 150000
})

service.interceptors.request.use(
  (config) => {
    // 判断store是否存在token
    const token = UserModule.token || getToken()
    if (token) {
      // 存在token就在请求携带token
      config.headers.Authorization = 'Bearer ' + token
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
    } else {
      if (res.code === 1) {
        Notify.create({
          type: 'negative',
          position: 'top',
          message: '登录已失效，请重新登录'
        })
        setTimeout(() => {
          UserModule.ResetToken()
          // location.reload()
          router.replace('/login')
        }, 1000)
      } else if (res.code === 401) {
        window.location.href = '/unauthorized'
      } else {
        Notify.create({
          type: 'negative',
          position: 'top',
          message: res.message
        })
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
