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
      <div class="text-secondary">剩余{{options.length}}项</div>
    </div>
    <div class="todo-main">
<!--      <q-option-group-->
<!--          :options="options"-->
<!--          type="checkbox"-->
<!--          v-model="group"-->
<!--      />-->
      <q-scroll-area
          :thumb-style="thumbStyle"
          style="height: 350px;"
      >
<!--        <q-list>-->
<!--          <q-item v-for="(i,index) in options" :key="index" tag="label" v-ripple>-->
<!--            <q-item-section avatar>-->
<!--              <q-checkbox v-model="group" toggle-indeterminate :val="i.value" />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--              <q-item-label>{{ i.label }}</q-item-label>-->
<!--            </q-item-section>-->
<!--          </q-item>-->
<!--        </q-list>-->
        <draggable
            :list="options"
            class="list-group"
            ghost-class="ghost"
            @start="dragging = true"
            @end="dragging = false"
        >
          <div  v-for="(i,index) in options" :key="index" class="todo-item">
            <q-checkbox v-model="i.done" />
            <q-item-section>
              <div @dblclick="toggleEdit(index)" class="fx-between px-16">
                <q-item-label v-if="!i.editAble">{{ i.label }}</q-item-label>
                <q-input v-else v-model="options[index].label" @blur="toggleEdit(index)" autofocus placeholder="添加任务" />
                <q-icon class="cursor-pointer invisible" color="red" @click="deleteTask(index)" size="20px" name="delete" />
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
import {Component, Vue} from "vue-property-decorator"
import Draggable from 'vuedraggable'


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

  private thumbStyle = {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#a166ef',
    width: '5px',
    opacity: 0.75
  }

  private options = [
    { label: '30分钟阅读', done: false, editAble: false },
    { label: '1小时运动', done: false, editAble: false  },
    { label: '1小时运动', done: false, editAble: false  },
    { label: '1小时运动', done: false, editAble: false  },
    { label: '1小时运动', done: false, editAble: false  },
    { label: '1小时运动', done: false , editAble: false },
    { label: '1小时运动', done: false , editAble: false },
    { label: '1小时专业知识', done: false, editAble: false  }
  ]

  private toggleEdit(index: number) {
    this.options[index].editAble = !this.options[index].editAble
  }

  private deleteTask(index: number) {
    this.options.splice(index, 1)
  }

  private addTask() {
    this.options.push( { label: this.text, done: false, editAble: false  })
    this.text = ''
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
  height: 570px;
  padding: 24px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  .todo-header {
    padding: 12px 0;
    border-bottom: 0.5px solid $secondary;
  }
  .todo-main {
    padding: 12px 0;
    height: 370px;
    //background-color: rgba(0, 0, 0, 0.02);
    .todo-item {
      display: flex;
      padding: 8px 0;
      .q-item__section--main {
        .q-input {
          width: 90%;
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
    bottom: 24px;
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
</style>
