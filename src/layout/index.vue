<template>
  <q-layout view="lHh Lpr lFf">
    <to-header />
    <to-sidebar />
    <q-page-container class="main-app">
      <RouterView />
    </q-page-container>
    <q-page-container style="padding-top: 0">
      <to-footer />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import ToHeader from '@/layout/components/ToHeader.vue'
import ToSidebar from "@/layout/components/ToSidebar.vue"
import ToFooter from '@/layout/components/ToFooter.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Home',
  components: {
    ToHeader,
    ToFooter,
    ToSidebar
  }
})

export default class extends Vue {

}
</script>

<style lang="scss">
.main-app {
  display: grid;
  min-height: calc(100vh - 65px);
}
</style>
