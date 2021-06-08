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
  private token:any = ''

  created() {
    this.token = this.$route.query.token
    UserModule.SetToken(this.$route.params.token)
    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>

</style>
