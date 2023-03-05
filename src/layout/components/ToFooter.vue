<template>
  <footer><div v-if='!isMobile' class="copyright">Copyright @2021-{{ year }} <a href="https://fendy5.cn">Fendy</a> All Rights Reserved </div></footer>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator"
import { isMobile } from '@/utils'

@Component({
  name: 'Footer'
})

export default class extends Vue {
  private year = 0
  private isMobile = isMobile()

  created() {
    const date = new Date()
    this.year = date.getFullYear()
  }
}

</script>

<style lang="scss" scoped>
.copyright {
  text-align: center;
  margin: 20px 0;
  font-size: 14px;
  color: grey;
}
</style>
