<template>
  <q-layout view="lHh Lpr lFf">
    <to-header />
    <to-sidebar />
    <q-page-container>
      <RouterView />
    </q-page-container>
    <to-footer />
  </q-layout>
</template>

<script lang="ts">
import HelloWorld from '../components/HelloWorld.vue'
import ToHeader from '@/layout/ToHeader.vue'
import ToSidebar from "@/layout/ToSidebar.vue"
import ToFooter from '@/layout/ToFooter.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Home',
  components: {
    ToHeader,
    ToFooter,
    ToSidebar,
    HelloWorld
  }
})

export default class extends Vue {

}
</script>

<style lang="scss">
.q-page-container {
  min-height: calc(100vh - 50px);
}
</style>
