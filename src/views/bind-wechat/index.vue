<template>
  <div class="center">
    <div class="text-center" v-if="status==='success'">
      <q-icon class="text-primary" size="80px"  name="check_circle"></q-icon>
      <h5 class="text-center">绑定成功</h5>
<!--      <q-btn class="w-full" outline style="color: #a5a2a2;" label="关闭"/>-->
    </div>
    <div class="text-center" v-else>
      <q-icon style="color: #ea0c0c;" size="80px" name="error"></q-icon>
      <h5 class="text-center lh-24">绑定失败</h5>
      <p class="lh-24">该微信已绑定别的账号，请更换别的微信再试！</p>
<!--      <q-btn @click="window.close()" class="w-full" outline style="color: #a5a2a2;" label="关闭"/>-->
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator'

export default class BindWechat extends Vue {
  private status = this.$route.query.result
}
</script>

<style lang="scss" scoped>

</style>
