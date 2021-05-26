<template>
  <div class="todo-list">
    <q-tabs
        v-model="tab"
        narrow-indicator
        dense
        align="justify"
    >
      <q-tab class="text-primary" name="mails" icon="apps" label="全部" />
      <q-tab class="text-orange" name="alarms" icon="event_available" label="待完成" />
      <q-tab class="text-green" name="movies" icon="task_alt" label="已完成" />
    </q-tabs>
    <div class="todo-header fx-between">
      <div class="text-primary text-lg font-bold">May25</div>
      <div class="text-secondary">剩余{{todoList.length}}项</div>
    </div>
    <div class="todo-main">
      <q-scroll-area
          :thumb-style="thumbStyle"
          style="height: 365px;"
      >
        <draggable
            :list="todoList"
            class="list-group"
            ghost-class="ghost"
            :options="{handle: '.cursor-move'}"
            @start="dragging = true"
            @end="dragging = false"
        >
          <div  v-for="(i,index) in todoList" :key="index" class="todo-item">
            <q-checkbox v-model="i.done" />
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
        </draggable>
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
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator"
import Draggable from 'vuedraggable'
import {getTodoListApi, updateItemsApi} from "@/api/todo-items"

export interface Task {
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
  private tab = 'mails'
  private canUpdate = false

  private thumbStyle = {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#a166ef',
    width: '5px',
    opacity: 0.75
  }

  private todoList:Task[] = []

  created() {
    getTodoListApi({ list_id: this.listId }).then(value => {
      this.todoList = value.data.content
    })
  }

  private toggleEdit(index: number) {
    if (this.todoList[index].editAble) {
      this.updateTask()
    }
    this.todoList[index].editAble = !this.todoList[index].editAble
  }

  private deleteTask(index: number) {
    this.todoList.splice(index, 1)
  }

  private addTask() {
    this.todoList.push({ label: this.text, done: false, editAble: false  })
    this.text = ''
  }

  @Watch('todoList', {deep: false})
  handleWatch() {
    this.canUpdate && this.updateTask()
    this.canUpdate = true
  }

  private updateTask() {
    updateItemsApi({content: this.todoList}, this.listId)
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
    .todo-main {
      height: 365px;
    }
  }
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
