<template>
  <footer><div class="copyright">Copyright @{{ year }} <a href="https://fendy5.cn">Fendy</a> All Rights Reserved </div></footer>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator"

@Component({
  name: 'Footer'
})

export default class extends Vue {
  private year = 0

  created() {
    const date=new Date()
    this.year=date.getFullYear()
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
