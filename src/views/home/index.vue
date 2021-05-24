<template>
  <div class="home">
    <div class="folder-list">
      <div v-for="i in folderList" :key="i.id" class="folder">
        <div to="/user">
          <svg-icon class="text-primary" icon-class="folder" />
          <q-menu :touch-position="true" :context-menu="true" transition-show="rotate" transition-hide="rotate">
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section>编辑</q-item-section>
                <q-popup-edit @before-hide="editFolder(i.id)" v-model="editPopup" content-class="bg-accent text-white">
                  <q-input dark color="white" v-model="folderName" dense autofocus counter>
                    <template v-slot:append>
                      <q-icon name="edit" />
                    </template>
                  </q-input>
                </q-popup-edit>
              </q-item>
              <q-item @click="deleteFolder(i.id)" clickable v-close-popup>
                <q-item-section>删除</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>属性</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
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
import {addFolderApi, deleteFoldersApi, getFoldersApi, updateFoldersApi} from "@/api/folders"

@Component({
  components: {
    HelloWorld,
  }
})
export default class Home extends Vue {
  private folderName = ''
  private prompt = false
  private editPopup = ''
  private folderList = []

  private addFolder() {
    addFolderApi({folderName: this.folderName}).then( () => {
      this.prompt = false
      this.getFolderList()
      this.folderName = ''
    })
  }

  private editFolder(id: number) {
    this.folderName && updateFoldersApi({folderName: this.folderName}, id).then(() => {
      this.getFolderList()
      this.folderName = ''
    })
  }

  private deleteFolder(id: number) {
    this.$q.dialog({
      title: '警告',
      message: '删除文件夹会同时删除里面的所有数据，是否继续？',
      cancel: '取消',
      ok: '确定',
      persistent: true
    }).onOk(() => {
      deleteFoldersApi(id).then(() => {
        this.getFolderList()
      })
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
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
