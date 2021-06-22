<template>
  <div class="relative">
    <q-spinner-cube v-if="loading.page" class="center" size="5em" color="primary" />
    <div v-else>
      <div class="p-16">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/" />
          <q-breadcrumbs-el :label="`${folder.name}`" icon="folder" :to="`/folder/${folder.fd_id}`" />
          <q-breadcrumbs-el :label="title" icon="inventory" />
        </q-breadcrumbs>
      </div>
      <div class="flex-center">
        <div class="todo-list">
          <q-tabs
              v-model="tab"
              narrow-indicator
              dense
              align="justify"
          >
            <q-tab class="text-primary" name="all" icon="apps" label="全部" />
            <q-tab class="text-orange" name="todo" icon="event_available" label="待完成" />
            <q-tab class="text-green" name="done" icon="task_alt" label="已完成" />
          </q-tabs>
          <div v-if="tab==='all'" class="all-list">
            <div class="todo-header fx-between">
              <div class="text-primary text-lg font-bold">{{ title }}</div>
              <div class="text-secondary">一共{{ allList.length}}项</div>
            </div>
            <div class="todo-main">
              <q-scroll-area
                  v-if="allList.length"
                  :thumb-style="thumbStyle"
                  style="height: 365px;"
              >
                <draggable v-if="allList.length" :list="allList" class="list-group" ghost-class="ghost" handle=".cursor-move" @start="dragging = true" @end="dragging = false">
                  <div  v-for="(i,index) in allList" :key="index">
                    <div v-if="!i.done" class="todo-item">
                      <q-checkbox @input="changeInput" v-model="i.done" />
                      <q-item-section>
                        <div @dblclick="toggleEdit(index)" class="fx-between px-16">
                          <q-item-label v-if="!i.editAble">{{ i.label }}</q-item-label>
                          <q-input v-else v-model="i.label" @blur="toggleEdit(index)" @keyup.enter="toggleEdit(index)" autofocus placeholder="添加任务" />
                          <span>
                      <q-icon class="invisible cursor-move px-8" size="24px" name="drag_handle" />
                      <q-icon class="cursor-pointer invisible" color="red" @click="deleteTask(index)" size="20px" name="delete" />
                   </span>
                        </div>
                      </q-item-section>
                    </div>
                  </div>
                </draggable>
                <div  v-for="(i,index) in allList" :key="index" >
                  <div v-if="i.done" class="todo-item">
                    <q-checkbox @input="changeInput" v-model="i.done" />
                    <q-item-section>
                      <div @dblclick="toggleEdit(index)" class="fx-between px-16">
                        <q-item-label :class="{'text-secondary': i.done,'text-through': i.done}" v-if="!i.editAble">{{ i.label }}</q-item-label>
                        <q-input v-else v-model="i.label" @blur="toggleEdit(index)" @keyup.enter="toggleEdit(index)" autofocus placeholder="添加任务" />
                        <span class="text-right">
                      <q-icon class="cursor-pointer invisible" color="red" @click="deleteTask(index)" size="20px" name="delete" />
                    </span>
                      </div>
                    </q-item-section>
                  </div>
                </div>
              </q-scroll-area>
              <div class="text-center pt-32" v-else>
                <svg-icon  icon-class="no-data" />
                <p class="text-secondary">还没有数据哦~</p>
              </div>
            </div>
            <div class="todo-footer">
              <q-input @keyup.enter="addTask" v-model="text" label="添加一个任务">
                <template v-slot:prepend>
                  <q-icon name="add" />
                </template>
              </q-input>
            </div>
          </div>
          <div v-else-if="tab==='todo'" class="">
            <div class="todo-header fx-between">
              <div class="text-primary text-lg font-bold">{{ title }}</div>
              <div class="text-secondary">一共{{ todoAmount }}项</div>
            </div>
            <div class="todo-main">
              <q-scroll-area
                  :thumb-style="thumbStyle"
                  style="height: 365px;"
              >
                <draggable v-if="todoAmount!==0" :list="allList" class="list-group" ghost-class="ghost" handle=".cursor-move" @start="dragging = true" @end="dragging = false">
                  <div  v-for="(i,index) in allList" :key="index">
                    <div v-if="!i.done" class="todo-item">
                      <q-checkbox @input="changeInput" v-model="i.done" />
                      <q-item-section>
                        <div @dblclick="toggleEdit(index)" class="fx-between px-16">
                          <q-item-label v-if="!i.editAble">{{ i.label }}</q-item-label>
                          <q-input v-else v-model="i.label" @blur="toggleEdit(index)" @keyup.enter="toggleEdit(index)" autofocus placeholder="添加任务" />
                          <span>
                      <q-icon class="invisible cursor-move px-8" size="24px" name="drag_handle" />
                      <q-icon class="cursor-pointer invisible" color="red" @click="deleteTask(index)" size="20px" name="delete" />
                   </span>
                        </div>
                      </q-item-section>
                    </div>
                  </div>
                </draggable>
                <div class="text-center pt-32" v-else>
                  <svg-icon  icon-class="no-data" />
                  <p class="text-secondary">还没有数据哦~</p>
                </div>
              </q-scroll-area>
            </div>
            <div class="todo-footer">
              <q-input @keyup.enter="addTask" v-model="text" label="添加一个任务">
                <template v-slot:prepend>
                  <q-icon name="add" />
                </template>
              </q-input>
            </div>
          </div>
          <div v-else-if="tab==='done'" class="">
            <div class="todo-header fx-between">
              <div class="text-primary text-lg font-bold">{{ title }}</div>
              <div class="text-secondary">一共{{ allList.length-todoAmount }}项</div>
            </div>
            <div class="todo-main">
              <q-scroll-area
                  :thumb-style="thumbStyle"
                  style="height: 365px;"
              >
                <div v-if="allList.length-todoAmount!==0">
                  <div  v-for="(i,index) in allList" :key="index" >
                    <div v-if="i.done" class="todo-item">
                      <q-checkbox @input="changeInput" v-model="i.done" />
                      <q-item-section>
                        <div @dblclick="toggleEdit(index)" class="fx-between px-16">
                          <q-item-label :class="{'text-secondary': i.done,'text-through': i.done}" v-if="!i.editAble">{{ i.label }}</q-item-label>
                          <q-input v-else v-model="i.label" @blur="toggleEdit(index)" @keyup.enter="toggleEdit(index)" autofocus placeholder="添加任务" />
                          <span class="text-right">
                      <q-icon class="cursor-pointer invisible" color="red" @click="deleteTask(index)" size="20px" name="delete" />
                    </span>
                        </div>
                      </q-item-section>
                    </div>
                  </div>
                </div>
                <div class="text-center pt-32" v-else>
                  <svg-icon  icon-class="no-data" />
                  <p class="text-secondary">还没有数据哦~</p>
                </div>
              </q-scroll-area>
            </div>
            <div class="todo-footer">
              <q-input @keyup.enter="addTask" v-model="text" label="添加一个任务">
                <template v-slot:prepend>
                  <q-icon name="add" />
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
import Draggable from 'vuedraggable'
import { updateItemsApi} from "@/api/todo-lists"
import {getTodoDetailApi} from "@/api/todo-lists"

export interface Task {
  id: string
  label: string
  done: boolean
  editAble: boolean
}

@Component({
  name: 'TodoList',
  components: {
    Draggable
  }
})

export default class Folder extends Vue {
  private listId = this.$route.params.id
  private text = ''
  private tab = 'all'
  private canUpdate = false
  private title = ''
  private folder = ''
  private loading = {
    page: true
  }

  private thumbStyle = {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#a166ef',
    width: '5px',
    opacity: 0.75
  }

  get todoAmount() {
    const todoList = this.allList.filter(value => !value.done)
    return todoList.length
  }

  private allList:Task[] = []
  // private tabs = new Map().set('all',this.allList).set('todo', this.todoList).set('done', this.doneList)

  created() {
    getTodoDetailApi(this.listId).then(value => {
      this.allList = value.data.content
      this.folder = value.data.folder
      this.title = value.data.name
      document.title =this.title
      this.loading.page = false
    })
  }

  private changeInput() {
    this.updateTask()
  }

  private toggleEdit(index: number) {
    if (this.allList[index].editAble) {
      this.updateTask()
    }
    this.allList[index].editAble = !this.allList[index].editAble
  }

  private deleteTask(index: number) {
    this.$q.dialog({
      title: '警告',
      message: '是否确认删除该事项？',
      cancel: '取消',
      ok: '确定',
      persistent: true
    }).onOk(() => {
      const task = this.allList.splice(index, 1)
      const idx = this.allList.findIndex(value => task[0].id === value.id)
      this.allList.splice(idx, 1)
    })
  }

  private addTask() {
    if (this.text) {
      const randomString = Math.random().toString(36).slice(-8)
      const task = {label: this.text, done: false, editAble: false, id: randomString}
      this.allList.push(task)
      this.text = ''
    }
  }

  @Watch('allList')
  handleWatch() {
    this.canUpdate && this.updateTask()
    this.canUpdate = true
  }

  private updateTask() {
    updateItemsApi({content: this.allList}, this.listId)
  }

}
</script>

<style lang="scss" scoped>
.todo-list {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 580px;
  padding: 24px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  .todo-header {
    padding: 12px 0;
    border-bottom: 0.5px solid $secondary;
  }
  .todo-main {
    padding-top: 12px;
    height: 380px;
    background-color: rgba(0, 0, 0, 0.01);
    .todo-item {
      display: flex;
      padding: 8px 0;
      .q-item__section--main {
        .q-input {
          width: 80%;
        }
        span {
          min-width: 55px;
        }
        &:hover{
          .q-icon {
            visibility: visible !important;
          }
          & {
            background-color: rgba(0, 0, 0, 0.02);
          }
        }
      }
    }
  }
  .todo-footer {
    position: absolute;
    background: #fafafa;
    bottom: 15px;
    width: 90%;
  }
}
@media (max-width: 450px) {
  .todo-list {
    width: 100%;
    box-shadow: none;
    position: relative;
    left: unset;
    top: unset;
    transform: unset;
    padding: 0 24px 24px 24px;
  }
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
