<template>
  <div>{{ token }}</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import {UserModule} from "@/store/modules/user"

@Component({
  name: 'WechatLogin'
})
export default class WechatLogin extends Vue {
  private token = ''

  created() {
    this.token = this.$route.params.token
    UserModule.SetToken(this.$route.params.token)
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>

</style>
