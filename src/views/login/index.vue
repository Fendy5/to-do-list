<template>
  <div class="login">
    <q-input color="purple-12" v-model="email" label="邮箱">
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>
    <div class="text">4444</div>
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

html {
  //background-color: $bg-secondary;
}
.text {
  //color: $info;
}
.login {
  width: 500px;
  height: 560px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
