<template>
  <div class="relative">
    <q-spinner-cube v-if="loading" class="center" size="5em" color="primary" />
    <div v-else>
      <div class="p-16">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/todo-sets" />
          <q-breadcrumbs-el class='ellipsis-2' :label="`${folder.name}`" icon="folder" />
        </q-breadcrumbs>
      </div>
      <div v-if="todoList.length" class="folder-list">
        <div v-for="i in todoList" :key="i.id" class="folder">
          <RouterLink :to="`/list/${i.list_id}`">
            <svg-icon class="text-primary todo-icon" icon-class="todo-list" />
            <q-menu :touch-position="true" :context-menu="true" transition-show="rotate" transition-hide="rotate">
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section v-if="i.is_top" @click="top(i.list_id, true)">取消置顶</q-item-section>
                  <q-item-section v-else @click="top(i.list_id)">置顶</q-item-section>
                </q-item>
                <q-item @click="showEdit(i.name)" clickable>
                  <q-item-section>编辑</q-item-section>
                  <q-popup-edit @before-hide="edit(i.list_id, i.name)" v-model="editPopup" content-class="bg-accent text-white">
                    <q-input dark color="white" v-model="name" dense autofocus counter>
                      <template v-slot:append>
                        <q-icon name="edit" />
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-item>
                <q-item clickable>
                  <q-item-section @click="reuseToDoList(i)">复用</q-item-section>
                  <q-dialog v-model="reuseDialog" persistent transition-show="scale" transition-hide="scale">
                    <q-card>
                      <q-card-section class="row items-center">
                        <q-form style='width: 350px'>
                          <q-input color="purple-12"  v-model="reuseData.name" label="名称" lazy-rules :rules="[val => val && val.length > 0 || '请输入名称']" />
                          <q-select emit-value map-options color="purple-12" v-model="reuseData.folder_id" option-value="fd_id" option-label="name" :options="folderList" label="所属"></q-select>
                          <q-toggle class='q-mt-lg' v-model="reuseData.is_top" label='是否置顶' color="purple-12" />
                        </q-form>
                      </q-card-section>

                      <q-card-actions align="right">
                        <q-btn flat label="取消" color="primary" v-close-popup />
                        <q-btn flat @click='onReuseSubmit' label="确定" color="primary" v-close-popup />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                </q-item>
                <q-item @click="deleteTodoList(i.list_id)" clickable v-close-popup>
                  <q-item-section>删除</q-item-section>
                </q-item>
<!--                <q-item clickable v-close-popup>-->
<!--                  <q-item-section>属性</q-item-section>-->
<!--                </q-item>-->
              </q-list>
            </q-menu>
          </RouterLink>
          <span class="text-primary text-center ellipsis-2 todo-name">{{ i.name }}</span>
        </div>
      </div>
      <div v-else class="center">
        <div class="text-center" >
          <svg-icon  icon-class="no-data" />
          <p class="text-secondary">还没有数据哦~</p>
        </div>
      </div>
      <page-sticky @click="addTodoList" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import PageSticky from "@/components/PageSticky.vue"
import { addTodoListsApi, deleteTodoListsApi, getTodoListsApi, reuseTodoListApi, topApi, updateTodoListsApi } from '@/api/todo-lists'
import { ReuseToDoListProp } from '@/types/todo-list'
import { getFoldersApi } from '@/api/folders'

interface TodoListProp {
  folder_id: string
  id: number
  is_top: boolean
  list_id: string
  name: string
}

@Component({
  name: 'Folder',
  components: {PageSticky}
})
export default class Folder extends Vue {
  private todoList:TodoListProp[] = []
  private name = ''
  private editPopup = ''
  private folder = {
    name: '文件夹'
  }
  private loading = true
  // TodoList复用
  private reuseDialog = false
  private reuseData: ReuseToDoListProp = {
    name: '',
    folder_id: '',
    list_id: '',
    is_top: true
  }
  private folderList = []

  created() {
    this.getTodoList()
  }

  private showEdit(name: string) {
    this.name = name
  }

  /**
   * @param id
   * @param cancel 是否取消置顶
   * @private
   */
  private top(id: string, cancel = false) {
    topApi(id, {cancel}).then(value => {
      this.todoList = value.data
    })
  }


  private async reuseToDoList(TodoListItem: TodoListProp) {
    this.reuseDialog = true
    this.reuseData.name = TodoListItem.name
    this.reuseData.list_id = TodoListItem.list_id
    this.reuseData.folder_id = this.$route.params.id
    const res = await getFoldersApi()
    this.folderList = res.data?.folders
  }

  private async onReuseSubmit() {
    const res = await reuseTodoListApi(this.reuseData)
    await this.$router.push(`/list/${res.data}`)
  }

  /**
   * @description 编辑
   * @param id
   * @param name
   * @private
   */
  private edit(id: string, name: string) {
    (this.name && name!==this.name) && updateTodoListsApi({name: this.name, folder_id: this.$route.params.id}, id).then(() => {
      this.getTodoList()
      this.name = ''
    })
  }

  private deleteTodoList(id: string) {
    this.$q.dialog({
      title: '警告',
      message: '是否确认删除该to do list继续？',
      cancel: '取消',
      ok: '确定',
      persistent: true
    }).onOk(() => {
      deleteTodoListsApi(id).then(() => {
        this.getTodoList()
      })
    })
  }

  private getTodoList() {
    getTodoListsApi({folder_id: this.$route.params.id}).then(value => {
      this.todoList = value.data.todoList
      this.folder = value.data.folder
      document.title = value.data.folder.name
      this.loading = false
    })
  }

  private addTodoList(name: string) {
    addTodoListsApi({name,folder_id: this.$route.params.id}).then((val) => {
      this.$router.push(`/list/${val.data.list_id}`)
      // this.getTodoList()
      // this.name = ''
    })
  }
}
</script>

<style lang="scss" scoped>
.todo-icon {
  width: 4rem;
}
</style>
