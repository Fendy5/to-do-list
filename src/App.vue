<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'App'
})

export default class extends Vue {}
</script>

<style lang="scss">
html {
  background-color: $bg-secondary;
}
</style>
