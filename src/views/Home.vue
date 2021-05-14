<template>
  <div class="home">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
          icon="add"
          direction="up"
          color="accent"
      >
        <q-fab-action color="primary" icon="person_add" />
        <q-fab-action color="primary" icon="mail" />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
