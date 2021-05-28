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

export default class extends Vue {
  created() {
    window.onbeforeunload = () => {
      localStorage.setItem('history', this.$route.path)
      localStorage.setItem('load_history', 'true')
    }
    localStorage.setItem('load_history', 'false')
  }
}
</script>

<style lang="scss">
html {
  background-color: $bg-secondary;
}
</style>
