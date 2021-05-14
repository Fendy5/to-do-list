<template>
  <q-header elevated class="glossy">
    <q-toolbar>
      <q-btn
          flat
          dense
          round
          @click="toggleSideBar"
          aria-label="Menu"
          icon="menu"
      />

      <q-toolbar-title>
        To Do List
      </q-toolbar-title>

      <div>Version 0.91</div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {AppModule} from '@/store/modules/app'

@Component({
  name: 'Header'
})
export default class extends Vue {
  private toggleSideBar() {
    AppModule.ToggleSideBar()
  }
}
</script>

<style lang="scss" scoped>

</style>
