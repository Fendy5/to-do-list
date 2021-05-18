<template>
  <div class="login shadow">
    <h3 class="text-primary text-center">登录</h3>
<!--    <div class="fx-center">-->
<!--      <svg-icon icon-class="logo" class="wh-25" />-->
<!--      <span class="pl-8">To Do List</span>-->
<!--    </div>-->
    <div class="login-form mx-auto">
      <div class="pb-32">
        <q-input color="purple-12" v-model="email" label="邮箱">
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
      </div>
      <div class="pb-32">
        <q-input color="purple-12" v-model="email" label="密码">
          <template v-slot:prepend>
            <q-icon name="password" />
          </template>
        </q-input>
      </div>
      <div class="pb-32 pt-16">
        <q-btn class="w-full" color="primary">
          登录
          <template v-slot:loading>
            <q-spinner-radio />
          </template>
        </q-btn>
      </div>
      <div class="fx-between">
        <div class="text-primary">免费注册</div>
        <div class="text-secondary">忘记密码</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"

@Component({
  name: 'Login'
})

export default class Login extends Vue {
  private email = ''
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
</style>
