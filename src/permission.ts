import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'

const whiteList = ['/login', '/register','/wechat-login','/forget']

router.beforeEach(async(to: Route, _: Route, next: any) => {
  to.meta.title && (document.title = to.meta.title)
  if (UserModule.token) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      // const history = localStorage.getItem('history')
      // const load_history = localStorage.getItem('load_history')
      // if ((to.path==='/home'||to.path==='/') && history && history!=='/' && load_history==='true') {
      //   next(history)
      // } else {
      //   next()
      // }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
