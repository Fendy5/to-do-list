<template>
  <div>
    <div class="fx p-32">
      <svg-icon icon-class="logo" class="wh-35" />
      <span class="pl-8 font-bold text-lg text-primary">To Do List</span>
    </div>
    <div class="login shadow">
      <h3 class="text-primary text-center">找回密码</h3>
      <q-form v-if="step===0" @reset="onReset" ref="form" @submit="handleForget" class="login-form mx-auto">
        <div class="pb-32">
          <q-input :rules="[val => val && val.length > 0 || '请输入邮箱',validateEmail]" color="primary" v-model="loginForm.email" label="邮箱">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>
        <div class="py-32">
          <q-btn :loading="loading" type="submit" class="w-full" color="primary">找回密码</q-btn>
        </div>
      </q-form>
      <q-form v-else @reset="onReset" ref="form" @submit="handleUpdatePassword" class="login-form mx-auto">
        <div class="pb-32">
          <q-input :rules="[val => val && val.length > 8 || '请输入不少于8位数字的密码']" color="primary" type="password" v-model="loginForm.password" label="新密码">
            <template v-slot:prepend>
              <q-icon name="password" />
            </template>
          </q-input>
        </div>
        <div class="py-32">
          <q-btn :loading="loading" type="submit" class="w-full" color="primary">重置密码</q-btn>
        </div>
      </q-form>
      <div class="text-center">
        <span class="text-secondary">已经有账号？</span>
        <RouterLink class="text-primary" to="/login">登录</RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import {Component} from "vue-property-decorator"
import loginMixin from '@/mixins/login'
import {forgetApi, updatePasswordApi} from "@/api/users"

@Component({
  name: 'Forget'
})
export default class Forget extends mixins(loginMixin) {
  private loading = false
  private step = 0

  created() {
    if (this.$route.query.token) {
      this.step = 1
    }
  }

  private handleForget() {
    this.loading = true
    forgetApi({email: this.loginForm.email}).then(() => {
      // this.loginForm.email = ''
      (this.$refs.form as any).reset()
    }).finally(() => {
      this.loading = false
    })
  }

  private handleUpdatePassword() {
    updatePasswordApi({password: this.loginForm.password, token: this.$route.query.token}).then(() => {
      this.$router.push('/login')
    })
  }

  private onReset() {
    this.loginForm.email = ''
  }
}
</script>

<style lang="scss" scoped>
@import "./scss/index";
</style>
