<template>
  <div class="p-12 relative">
    <q-spinner-cube v-if="loading" class="center" size="5em" color="primary" />
    <div v-else class="folder-list">
      <div v-for="i in folderList" :key="i.id" class="folder">
        <RouterLink :to="`/folder/${i.fd_id}`">
          <svg-icon class="text-primary" icon-class="folder" />
          <q-menu :touch-position="true" :context-menu="true" transition-show="rotate" transition-hide="rotate">
            <q-list dense style="min-width: 100px">
              <q-item @click="showEdit(i.name)" clickable>
                <q-item-section>编辑</q-item-section>
                <q-popup-edit @before-hide="editFolder(i.id, i.name)" v-model="editPopup" content-class="bg-accent text-white">
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
        </RouterLink>
        <span class="text-primary text-center">{{ i.name }}</span>
      </div>
      <page-sticky @click="addFolder" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PageSticky from "@/components/PageSticky.vue"
import {addFolderApi, deleteFoldersApi, getFoldersApi, updateFoldersApi} from "@/api/folders"

@Component({
  components: {
    PageSticky
  }
})
export default class Home extends Vue {
  private folderName = ''
  private editPopup = ''
  private loading = true
  private folderList = []

  private addFolder(folderName: string) {
    addFolderApi({folderName: folderName}).then((val) => {
      // this.prompt = false
      // this.getFolderList()
      // this.folderName = ''
      this.$router.push(`/folder/${val.data.folder_id}`)
    })
  }

  private showEdit(folderName: string) {
    this.folderName = folderName
  }

  private editFolder(id: number, folderName: string) {
    (this.folderName && folderName!==this.folderName) && updateFoldersApi({folderName: this.folderName}, id).then(() => {
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
      this.loading = false
    })
  }

  created() {
    this.getFolderList()
  }

}
</script>
