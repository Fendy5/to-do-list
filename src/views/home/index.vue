<template>
  <div class="folder-list">
    <RouterLink v-for="i in 10" :key="i" to="/user" class="folder">
      <svg-icon class="text-primary" icon-class="folder" />
      <span class="text-primary">新建文件夹{{i}}</span>
    </RouterLink>

<!--    <svg-icon class="text-primary" icon-class="todo-list" />-->
    <q-page-sticky position="bottom-right" :offset="[64, 64]">
      <q-fab
          icon="add"
          direction="up"
          color="primary"
      >
        <q-fab-action color="primary" >
          <template>
             <svg-icon class="text-white wh-25" icon-class="folder" />
          </template>
        </q-fab-action>
        <q-fab-action color="primary"  >
          <template>
            <svg-icon class="text-white wh-25" icon-class="todo-list" />
          </template>
        </q-fab-action>
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
  }
})
export default class Home extends Vue {
}
</script>

<style lang="scss">
@import "../../styles/common";

.folder-list {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  .folder {
    @extend .flex-column-center;
    //@extend .wh-150;
    @extend .font-bold;
    //padding: 30px;
  }
}
a {
  text-decoration: none;
}
</style>
