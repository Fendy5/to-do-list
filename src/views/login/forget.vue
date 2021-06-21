<template>
  <div>
    <div class="fx p-32">
      <svg-icon icon-class="logo" class="wh-35" />
      <span class="pl-8 font-bold text-lg text-primary">To Do List</span>
    </div>
    <div class="login shadow">
      <h3 class="text-primary text-center">忘记密码</h3>
      <q-form @submit="handleForget" class="login-form mx-auto">
        <div class="pb-32">
          <q-input :rules="[val => val && val.length > 0 || '请输入邮箱',validateEmail]" color="primary" v-model="loginForm.email" label="邮箱">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>
        <div class="py-32">
          <q-btn type="submit" class="w-full" color="primary">
            找回密码
            <template v-slot:loading>
              <q-spinner-radio />
            </template>
          </q-btn>
        </div>
        <div class="text-center">
          <span class="text-secondary">已经有账号？</span>
          <RouterLink class="text-primary" to="/login">登录</RouterLink>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import {Component} from "vue-property-decorator"
import loginMixin from '@/mixins/login'

@Component({
  name: 'Forget'
})
export default class Forget extends mixins(loginMixin) {
  private handleForget() {
    // todo
  }
}
</script>

<style lang="scss" scoped>
@import "./scss/index";
</style>
