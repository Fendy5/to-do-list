<template>
  <div class='unauthorized'>
    <svg-icon icon-class='default' />
    <p>无访问权限</p>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Unauthorized'
})

export default class Unauthorized extends Vue {

}

</script>

<style lang='scss' scoped>
.unauthorized {
  color: #666666;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  svg {
    color: #666666;
  }
  p {
    text-align: center;
    font-weight: bold;
  }
}
</style>
