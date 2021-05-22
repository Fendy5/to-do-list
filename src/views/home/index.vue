<template>
  <div class="home">
    <div class="folder-list">
      <RouterLink v-for="i in 10" :key="i" to="/user" class="folder">
        <svg-icon class="text-primary" icon-class="folder" />
        <span class="text-primary text-center">新建文件夹新建文件夹{{i}}</span>
      </RouterLink>

      <!--    <svg-icon class="text-primary" icon-class="todo-list" />-->
      <q-page-sticky position="bottom-right" :offset="[64, 64]">
        <q-fab
            icon="add"
            direction="up"
            color="primary"
        >
          <q-fab-action @click="prompt=true" color="primary" >
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
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">文件夹名称</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="folderName" autofocus @keyup.enter="prompt=false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确定" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
  private folderName = ''
  private prompt = false
}
</script>

<style lang="scss">
@import "../../styles/common";
.home {
  .folder-list {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    .folder {
      @extend .flex-column-center;
      @extend .font-bold;
    }
  }
}
a {
  text-decoration: none;
}
</style>
