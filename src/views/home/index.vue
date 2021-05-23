<template>
  <div class="home">
    <div class="folder-list">
      <div v-for="i in folderList" :key="i.id" class="folder">
        <RouterLink to="/user">
          <svg-icon class="text-primary" icon-class="folder" />
        </RouterLink>
        <span class="text-primary text-center">{{ i.name }}</span>
      </div>

      <!--    <svg-icon class="text-primary" icon-class="todo-list" />-->
      <q-page-sticky position="bottom-right" :offset="[64, 64]">
        <q-fab
            icon="add"
            direction="up"
            color="primary"
        >
          <q-fab-action @click="prompt=true" color="primary" >
            <template>
              <svg-icon class="text-white wh-30" icon-class="folder" />
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
          <q-btn flat label="确定" @click="addFolder" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import {addFolderApi, getFoldersApi} from "@/api/folders"

@Component({
  components: {
    HelloWorld,
  }
})
export default class Home extends Vue {
  private folderName = ''
  private prompt = false
  private folderList = []

  private addFolder() {
    addFolderApi({folderName: this.folderName}).then( () => {
      this.prompt = false
      this.getFolderList()
      this.folderName = ''
    })
  }

  private getFolderList() {
    getFoldersApi().then(value => {
      this.folderList = value.data.folders
    })
  }

  created() {
    this.getFolderList()
  }

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
