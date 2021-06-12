<template>
  <div>
    <div class="fx p-32">
      <svg-icon icon-class="logo" class="wh-35" />
      <span class="pl-8 font-bold text-lg text-primary">To Do List</span>
    </div>
    <div class="login shadow">
      <h3 class="text-primary text-center">登录</h3>
      <div class="login-form mx-auto">
        <div class="pb-32">
          <q-input color="primary" @blur="validateEmail" v-model="loginForm.email" label="邮箱">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>
        <div class="pb-32">
          <q-input color="primary" type="password" v-model="loginForm.password" label="密码">
            <template v-slot:prepend>
              <q-icon name="password" />
            </template>
          </q-input>
        </div>
        <div class="pb-32 pt-16">
          <q-btn @click="handleLogin" class="w-full" color="primary">
            登录
            <template v-slot:loading>
              <q-spinner-radio />
            </template>
          </q-btn>
        </div>
        <div class="fx-between">
          <RouterLink to="/register" class="text-primary">免费注册</RouterLink>
          <RouterLink to="/forget" class="text-secondary">忘记密码</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component,Watch} from "vue-property-decorator"
import { mixins } from 'vue-class-component'
import loginMixin from '@/mixins/login'
import {UserModule} from "@/store/modules/user"
import {Dictionary} from "vue-router/types/router"
import {Route} from "vue-router"
import {isWechat} from "@/utils/validate"

@Component({
  name: 'Login'
})

export default class Login extends mixins(loginMixin) {
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  // created() {
  //   if (isWechat()) {
  //     location.href = `${process.env.VUE_APP_DOMAIN}/api/v1/wechat/login`
  //     // location.href = `http://10.1.143.65:7026/api/v1/wechat/login`
  //   }
  // }

  private async handleLogin() {
    await UserModule.Login(this.loginForm)
    this.$router.push({
      path: this.redirect || '/',
      query: this.otherQuery
    }).catch(err => {
      console.warn(err)
    })
  }

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }

}
</script>

<style lang="scss" scoped>
.login {
  width: 500px;
  height: 560px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  padding: 32px;
  .login-form {
    width: 350px;
  }
}
@media (max-width: 500px) {
  .login {
    height: 100%;
    width: 100%;
    .login-form {
      width: 90%;
    }
  }
}
</style>
