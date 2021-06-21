<template>
  <div>
    <div class="fx p-32">
      <svg-icon icon-class="logo" class="wh-35" />
      <span class="pl-8 font-bold text-lg text-primary">To Do List</span>
    </div>
    <div class="login shadow">
      <h3 class="text-primary text-center">登录</h3>
      <div class="pt-32" v-if="isWechat">
        <q-btn @click="wechatLogin" class="w-full mb-32" color="primary">微信登录</q-btn>
        <q-btn @click="isWechat=false" class="w-full mb-32" style="color: goldenrod;" outline>账号登录</q-btn>
      </div>
      <q-form  @submit="handleLogin" v-else class="login-form mx-auto">
        <div class="pb-32">
          <q-input  :rules="[val => val && val.length > 0 || '请输入邮箱',validateEmail]" color="primary" v-model="loginForm.email" label="邮箱">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>
        <div class="pb-32">
          <q-input :rules="[val => val && val.length>=8 || '密码必须大于或者等于8位']" color="primary" type="password" v-model="loginForm.password" label="密码">
            <template v-slot:prepend>
              <q-icon name="password" />
            </template>
          </q-input>
        </div>
        <div class="pb-32 pt-16">
          <q-btn :loading="loading" type="submit" class="w-full" color="primary">登录</q-btn>
        </div>
        <div class="fx-between">
          <RouterLink to="/register" class="text-primary">免费注册</RouterLink>
          <RouterLink to="/forget" class="text-secondary">忘记密码</RouterLink>
        </div>
      </q-form>
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
import { isWechat } from "@/utils/validate"

@Component({
  name: 'Login'
})

export default class Login extends mixins(loginMixin) {
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  wechatLogin() {
    location.href = `${process.env.VUE_APP_DOMAIN}/api/v1/wechat/login`
  }

  private loading = false;

  private isWechat = isWechat()

  private async handleLogin() {
    this.loading = true
    await UserModule.Login(this.loginForm).then( () => {
      this.loading = false
    })
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
@import "./scss/index";
</style>
