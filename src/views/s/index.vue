<template>
  <div class="flex-center">
    <q-spinner-cube v-if="loading" class="center" size="5em" color="primary" />
    <div v-else class="todo-list">
      <q-tabs class='mt-24' v-model="tab" narrow-indicator dense align="justify">
        <q-tab class="text-primary" name="all" icon="apps" label="全部" />
        <q-tab class="text-orange" name="todo" icon="event_available" label="待完成" />
        <q-tab class="text-green" name="done" icon="task_alt" label="已完成" />
      </q-tabs>
      <div v-if="tab==='all'" :style='{pointerEvents: canEdit ? "": "none"}' class="all-list">
        <div class="todo-header fx-between">
          <div class="text-primary text-lg font-bold">{{ title }}</div>
          <div class="text-secondary">一共{{ allList.length}}项</div>
        </div>
        <div class="todo-main">
          <q-scroll-area
            v-if="allList.length"
            :thumb-style="thumbStyle"
            style="height: calc(100vh - 210px);"
          >
            <draggable v-if="allList.length" :list="allList" class="list-group" ghost-class="ghost" handle=".cursor-move" @start="dragging = true" @end="dragging = false">
              <transition-group name="list-complete">
                <div  v-for="(i,index) in allList"  class="list-complete-item" :key="i.id">
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
              </transition-group>
            </draggable>
            <transition-group name="list-complete">
              <div  v-for="(i,index) in allList"  class="list-complete-item" :key="i.id" >
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
            </transition-group>
          </q-scroll-area>
          <div class="text-center pt-32" v-else>
            <svg-icon  icon-class="no-data" />
            <p class="text-secondary">还没有数据哦~</p>
          </div>
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
            style="height: calc(100vh - 210px);"
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
      </div>
      <div v-else-if="tab==='done'" class="">
        <div class="todo-header fx-between">
          <div class="text-primary text-lg font-bold">{{ title }}</div>
          <div class="text-secondary">一共{{ allList.length-todoAmount }}项</div>
        </div>
        <div class="todo-main">
          <q-scroll-area
            :thumb-style="thumbStyle"
            style="height: calc(100vh - 210px);"
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
      </div>
      <div class="todo-footer">
        <q-input :disable='!canEdit' @keyup.enter="addTask" v-model="text" label="添加一个任务">
          <template v-slot:prepend>
            <q-icon name="add" />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import ToDoList, { Task } from '@/components/ToDoList.vue'
import { getTodoListApi, updateItemsApi } from '@/api/todo-lists'
import Draggable from 'vuedraggable'

@Component({
  name: 'TodoListDetail',
  components: {
    ToDoList,
    Draggable
  }
})

export default class Folder extends Vue {
  private tab = 'all'
  private title = ''
  private allList:Task[] = []
  private listId = this.$route.params.id
  private thumbStyle = {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#a166ef',
    width: '5px',
    opacity: 0.75
  }
  private text = ''
  private canUpdate = false
  private loading = true
  private canEdit = 0

  private changeInput() {
    this.updateTask()
  }

  private updateTask() {
    updateItemsApi({content: this.allList}, this.listId)
  }

  private toggleEdit(index: number) {
    if (this.allList[index].editAble) {
      this.updateTask()
    }
    this.allList[index].editAble = !this.allList[index].editAble
  }

  private addTask() {
    if (this.text) {
      const randomString = Math.random().toString(36).slice(-8)
      const task = {label: this.text, done: false, editAble: false, id: randomString}
      this.allList.push(task)
      this.text = ''
    }
  }

  private deleteTask(index: number) {
    this.$q.dialog({
      title: '警告',
      message: '是否确认删除该事项？',
      cancel: '取消',
      ok: '确定',
      persistent: true
    }).onOk(() => {
      this.allList.splice(index, 1)
    })
  }

  @Watch('allList')
  handleWatch() {
    this.canUpdate && this.updateTask()
    this.canUpdate = true
  }

  get todoAmount() {
    const todoList = this.allList.filter(value => !value.done)
    return todoList.length
  }

  created() {
    getTodoListApi(this.listId).then(value => {
      this.allList = value.data.content
      this.title = value.data.name
      document.title = this.title
      this.canEdit = value.data.can_edit
      this.loading = false
    })
  }

}
</script>

<style lang='scss' scoped>
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
    //height: 380px;
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
    position: fixed;
    background: #fafafa;
    bottom: 8px;
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
.list-complete-item {
  transition: all 1s;
  //margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  //position: absolute;
}
</style>
