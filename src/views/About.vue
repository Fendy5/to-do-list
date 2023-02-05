<template>
  <div class="about flex-center">
    <p>版本号： {{version}}</p>
  </div>
</template>

<script lang='ts'>
import config from '@/../package.json'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'About'
})
export default class About extends Vue {
  private version = config.version
}
</script>
