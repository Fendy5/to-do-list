<template>
  <div>
    <div class="folder-list">
      <div v-for="i in todoList" :key="i.id" class="folder">
        <RouterLink :to="`/list/${i.list_id}`">
          <svg-icon class="text-primary todo-icon" icon-class="todo-list" />
          <q-menu :touch-position="true" :context-menu="true" transition-show="rotate" transition-hide="rotate">
            <q-list dense style="min-width: 100px">
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
              <q-item @click="deleteTodoList(i.list_id)" clickable v-close-popup>
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
    </div>
    <page-sticky @click="addTodoList" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import PageSticky from "@/components/PageSticky.vue"
import {addTodoListsApi, deleteTodoListsApi, getTodoListsApi, updateTodoListsApi} from "@/api/todo-lists"

@Component({
  name: 'Folder',
  components: {PageSticky}
})
export default class Folder extends Vue {
  private todoList = []
  private name = ''
  private editPopup = ''

  created() {
    this.getTodoList()
  }

  private showEdit(name: string) {
    this.name = name
  }

  private edit(id: string, name: string) {
    (this.name && name!==this.name) && updateTodoListsApi({name: this.name}, id).then(() => {
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
    })
  }

  private addTodoList(name: string) {
    addTodoListsApi({name,folder_id: this.$route.params.id}).then(() => {
      this.getTodoList()
      this.name = ''
    })
  }
}
</script>

<style lang="scss" scoped>
.todo-icon {
  width: 4rem;
}
</style>
