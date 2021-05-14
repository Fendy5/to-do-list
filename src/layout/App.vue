<template>
  <q-layout view="lHh Lpr lFf">
    <to-header />
    <sidebar />
    <q-page-container>
      <RouterView />
    </q-page-container>
    <to-footer />
  </q-layout>
</template>

<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import ToHeader from '@/layout/ToHeader.vue'
import Sidebar from "@/layout/Sidebar.vue"
import ToFooter from '@/layout/ToFooter'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Home',
  components: {
    ToHeader,
    ToFooter,
    Sidebar,
    HelloWorld
  }
})

export default class extends Vue {

}
</script>

<style lang="scss">
.q-page-container {
  padding-top:0 !important;
  min-height: calc(100vh - 50px);
}
</style>
