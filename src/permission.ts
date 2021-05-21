import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'

const whiteList = ['/login', '/register']

router.beforeEach(async(to: Route, _: Route, next: any) => {
  if (UserModule.token) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
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
