<template>
  <div class='h-full'>
    <q-spinner-cube v-if="loading.page" class="center" size="5em" color="primary" />
    <template v-else>
      <div class="flex h-full">
        <div class="todo-list">
          <q-tabs v-model="tab" narrow-indicator dense align="justify">
            <q-tab class="text-primary" name="all" icon="apps" label="全部" />
            <q-tab class="text-orange" name="todo" icon="img:/static/images/wait.svg" label="待完成" />
            <q-tab class="text-green" name="done" icon="task_alt" label="已完成" />
          </q-tabs>
          <div class="todo-header fx-between">
            <div class="text-primary text-lg font-bold">{{ title }}</div>
            <div class="text-secondary">一共 {{todoAmount[1]}}/{{ todoAmount[0] }}项</div>
          </div>
          <div class="all-list">
            <div class="todo-main">
              <q-scroll-area :thumb-style="thumbStyle" v-if="todoNodes.length">
                <q-tree :expanded.sync="expanded" :filter='tab' no-results-label='没有任何结果' :filter-method='filterStatus' :nodes="todoNodes" no-connectors node-key='id'>
                  <template v-slot:default-header='{node}'>
                    <div class="list-complete-item">
                      <div class="todo-item">
                        <q-checkbox @input="(val) => changeInput(val,node)" v-model="node.done" />
                        <q-item-section @dblclick='() => { toggleEdit(node, true) }'>
                          <div v-if='!node.editAble' class="fx-between px-16 text-content">
                            <span :style='isMobile?{width: `${labelWidth - 260}px`}: {}' class='content'>{{node.label}}</span>
                            <span class='handle-icon' v-if='!node.isParent'>
                              <q-icon class='invisible' size="20px" @click.stop='moveNode(node.id, true)' name='north' />
                              <q-icon class='invisible' size="20px" @click.stop='moveNode(node.id, false)' name='south' />
                              <q-icon @click.stop='deleteTask(node.id)' class="danger-text invisible" size="20px" name="delete" />
                            </span>
                          </div>
<!--                          <input v-model="node.label" v-else type='text'>-->
                          <q-input v-else @click.stop autofocus v-model="node.label" @blur='toggleEdit(node, false)' @keyup.enter="toggleEdit(node, false)" placeholder="添加任务" />
                        </q-item-section>
                      </div>
                    </div>
                  </template>
                </q-tree>
              </q-scroll-area>
              <q-scroll-area class="text-center pt-32" v-else>
                <svg-icon  icon-class="no-data" />
                <p class="text-secondary">还没有数据哦~</p>
              </q-scroll-area>
            </div>
          </div>
          <div class="todo-footer flex">
            <q-select dense filled clearable class='select-label' color="purple-12" transition-show="jump-up" transition-hide="jump-up" v-model="currentCategory" :options="todoNodes"></q-select>
            <q-input dense filled @focus='isSticky=true' @blur='isSticky=false' class='flex-1' @keyup.enter="addTask" v-model="text" label="添加一个任务(回车键确认)">
            </q-input>
          </div>
        </div>
      </div>
      <!-- 操作小图标-->
      <q-page-sticky v-if='!isDisabled' position="bottom-right" :offset="[32, 90]">
        <q-fab icon="keyboard_arrow_up" direction="up" color="primary">
          <!-- 清空状态-->
          <q-fab-action @click="clearStatus" icon='layers_clear' external-label label='清空状态' label-position="left"  color="primary" ></q-fab-action>
          <!-- 清空列表-->
          <q-fab-action @click="clearAll" icon='delete_sweep' external-label label='清空列表' label-position="left"  color="primary" ></q-fab-action>
          <!-- 取消置顶-->
          <q-fab-action @click="top(listId, isTop)" external-label :label='isTop?"取消置顶":"置顶列表"' label-position="left"  color="primary"  >
            <template>
              <svg-icon class="text-white wh-25" icon-class="cancel-pin" />
            </template>
          </q-fab-action>
          <!-- 分享链接-->
          <q-fab-action @click="authDialog=true" external-label label='分享链接' label-position="left"  color="primary" >
            <template>
              <svg-icon class="text-white wh-25" icon-class="share" />
            </template>
          </q-fab-action>
        </q-fab>
      </q-page-sticky>
      <!-- 选择权限-->
      <q-dialog v-model="authDialog" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">设置可编辑权限</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-select transition-show="jump-up" map-options emit-value transition-hide="jump-up" dense color="purple-12" v-model="auth" :options="authOptions" label="设置权限">
            </q-select>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="取消" v-close-popup />
            <q-btn flat :disable='auth===null' label="确定" @click='generateLink' v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- 分享链接弹窗-->
      <q-dialog v-model="linkDialog" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">链接</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <p>{{ shareLink }}</p>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="取消" v-close-popup />
            <q-btn flat @click='copyLink' label="复制" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Draggable from 'vuedraggable'
import { getTodoDetailApi, setTodoAuthApi, topApi, updateItemsApi } from '@/api/todo-lists'
import { copyText, isMobile } from '@/utils'
import { Notify } from 'quasar'
import { TodoItemProp } from '@/types/todo-list'
import { debounce } from 'lodash'
import { echo } from '@/utils/echo'

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
  private text = ''
  private tab = 'all'
  private canUpdate = false
  private title = ''
  private authDialog = false
  private linkDialog = false
  private shareLink = ''
  private isTop = false
  private isSticky = false // 键盘是否调起
  private currentCategory:TodoItemProp | null = null
  private selectedText = ''
  private labelWidth = window.screen.width
  private isMobile = isMobile()
  private expanded = ['']
  private auth: number | null = null // 分享链接的授权选项
  // private waitIcon = require('../../public/static/images/wait.svg')
  // private selectedNode: string | null = null

  private loading = {
    page: true
  }

  private authOptions = [
    { label: '仅自己可看', value: 0 },
    { label: '所有人可查看', value: 1 },
    { label: '所有人可编辑', value: 2 }
  ]

  private todoNodes: TodoItemProp[] = []

  private thumbStyle = {
    right: '2px',
    borderRadius: '5px',
    backgroundColor: '#a166ef',
    width: '5px',
    opacity: 0.75
  }

  @Prop({
    type: String,
    default: ''
  })
  readonly listId!:string

  get todoAmount() {
    let [allAmount, completedAmount] = [0, 0]
    const dfs = (arr: TodoItemProp[]) => {
      arr.forEach((i: TodoItemProp) => {
        if (i.children?.length) {
          dfs(i.children)
        } else {
          allAmount++
          i.done && completedAmount++
        }
      })
    }
    dfs(this.todoNodes)
    return [allAmount, completedAmount]
  }

  // // 待完成
  // get waitNodes() {
  //   return this.filterStatus(false)
  // }
  //
  //
  // get doneNodes() {
  //   return this.filterStatus()
  // }

  async created() {
    await this.getToDoDetail()
    this.initWebsocket()
  }

  private initWebsocket() {
    const channel = echo.private(`private.todo.${this.listId}`)
    console.log('初始化~')
    channel.subscribed(() => {
      console.log('subscribed~')
    }).listen('.todo-message', (e: TodoItemProp[]) => {
      console.log(e)
      this.todoNodes = e
    })
  }

  async getToDoDetail() {
    const { data:{ content, name, is_top, auth, folder } } = await getTodoDetailApi(this.listId)
    this.todoNodes = content
    this.title = name
    this.isTop = is_top
    this.auth = auth
    document.title = this.title
    this.$emit('folder', { ...folder, title: this.title })
    this.loading.page = false
  }

  private changeInput(val: boolean, node: TodoItemProp) {
    // 父节点
    if (node.children?.length) {
      node.children = this.changeStatus(node.children, val)
    } else {
      const parentNode = this.getParentNodeById(this.todoNodes, node.id)
      if (parentNode) {
        parentNode.done = this.checkNodeStatus(parentNode.children || [])
      }
    }
    this.updateTask(this)
  }

  // 判断节点状态 -1全未选 0部分选 1全选
  private checkNodeStatus(nodes: TodoItemProp[]) {
    const checked = []
    for (const node of nodes) {
      node.done && checked.push(node.id)
    }
    if (checked.length) {
      return checked.length === nodes.length ? true : null
    } else {
      return false
    }
  }

  // 通过id获取父节点
  private getParentNodeById(dataSource: TodoItemProp[], id: string | null) {
    if (!id) return null
    for (const i of dataSource) {
      if (i.children) {
        for (const j of i.children) {
          if (j.id === id) {
            return i
          }
        }
      }
    }
    return null
  }

  private moveNode(id: string, isUp: boolean) {
    const move = (dataSource: TodoItemProp[]) => {
      const len = dataSource.length
      const selectedIndex = dataSource.findIndex(i => i.id === id)
      const nodeArr = dataSource.splice(selectedIndex, 1)
      let start
      if (selectedIndex === 0 && isUp) {
        start = 0
      } else if (!isUp && selectedIndex === len - 1) {
        start = selectedIndex
      } else {
        start = isUp ? selectedIndex - 1 : selectedIndex + 1
        this.canUpdate = true
      }
      dataSource.splice(start, 0, nodeArr[0])
    }

    if (id) {
      const parentNode = this.getParentNodeById(this.todoNodes, id)
      // 二级节点
      if (parentNode) {
        parentNode.children && move(parentNode.children)
      } else {
        // 一级节点
        move(this.todoNodes)
      }
    }
  }

  // 改变所有子节点的状态
  private changeStatus(nodes: TodoItemProp[], status: boolean) {
    return nodes.map(i => {
      i.done = status
      return i
    })
  }

  // 清空TodoList状态
  clearStatus() {
    this.canUpdate = true
    this.todoNodes = this.todoNodes.map(i => {
      if (i.children?.length) {
        this.changeStatus(i.children, false)
      }
      i.done = false
      return i
    })
  }

  // 操控权限，显示TODO链接
  private async generateLink() {
    const { code } = await setTodoAuthApi(this.listId, { auth: this.auth })
    if (code === 0) {
      this.shareLink = `${process.env.VUE_APP_HOST}/s/${this.listId}`
      this.linkDialog = true
    }
  }

  // 置顶
  private async top(id: string, cancel = false) {
    const { code } = await topApi(id, { cancel })
    code === 0 && (this.isTop = true)
  }

  // 复制链接
  private copyLink() {
    copyText(this.shareLink)
    Notify.create({
      type: 'positive',
      position: 'top',
      message: '复制成功'
    })
  }

  // 清空列表
  private clearAll() {
    this.todoNodes = []
  }

  // private toggleEdit(index: number) {
  //   if (this.allList[index].editAble) {
  //     this.updateTask()
  //   }
  //   this.allList[index].editAble = !this.allList[index].editAble
  // }

  private toggleEdit(node: TodoItemProp, isEdit = true) {
    if (isEdit) {
      this.selectedText = node.label
    }
    node.editAble = isEdit
    if (node.label !== this.selectedText) {
      this.canUpdate = !isEdit
    }
    if (!isEdit && node.label !== this.selectedText) {
      this.canUpdate = true
      this.updateTask(this)
    }
  }

  private deleteTask(id: string) {
    this.$q.dialog({
      title: '警告',
      message: '是否确认删除该事项？',
      cancel: '取消',
      ok: '确定',
      persistent: true
    }).onOk(() => {
      if (id) {
        this.canUpdate = true
        const parentNode = this.getParentNodeById(this.todoNodes, id)
        if (parentNode) {
          const idx = parentNode.children?.findIndex(value => id === value.id)
          if (idx || idx === 0) {
            parentNode.children?.splice(idx, 1)
          }
          parentNode.done = this.checkNodeStatus(parentNode.children || [])
        } else {
          const idx = this.todoNodes.findIndex(value => id === value.id)
          this.todoNodes.splice(idx, 1)
        }
        // this.selectedNode = null
      }
    })
  }

  private addTask() {
    this.canUpdate = true
    if (this.text) {
      const randomString = Math.random().toString(36).slice(-8)
      const task = { label: this.text, done: false, editAble: false, id: randomString, children: [] }
      if (this.currentCategory) {
        const currentCategoryIndex = this.todoNodes.findIndex(i => i.id === this.currentCategory?.id)
        if (currentCategoryIndex !== -1) {
          this.todoNodes[currentCategoryIndex].children?.push(task)
          this.expanded = [this.currentCategory?.id]
        }
      } else {
        this.todoNodes.push(task)
      }
      this.text = ''
    }
  }

  private filterStatus(node: TodoItemProp, tab: string) {
    // const nodes = this.todoNodes
    // const dfs = (nodes: TodoItemProp[]) => {
    //   const tempNodes = []
    //   for (const node of nodes) {
    //     const wait = node.done === false || node.done === null
    //     if (isDone) {
    //       if (node.children?.length) {
    //         node.children = dfs(node.children)
    //         node.done !== false && tempNodes.push(node)
    //       } else {
    //         node.done && tempNodes.push(node)
    //       }
    //     } else {
    //       if (node.children?.length) {
    //         node.children = dfs(node.children)
    //         wait && tempNodes.push(node)
    //       } else {
    //         wait && tempNodes.push(node)
    //       }
    //     }
    //   }
    //   return tempNodes
    // }
    // return dfs(nodes)
    if (tab === 'all') {
      return true
    } else if (tab === 'todo') {
      return node.done !== true
    } else {
      return node.done === true
    }
  }

  @Watch('todoNodes', { deep: true })
  handleWatch() {
    if (this.canUpdate) {
      this.updateTask(this)
    }
  }

  private updateTask = debounce((_this: Folder) => {
    updateItemsApi({ content: _this.todoNodes }, _this.listId)
    _this.canUpdate = false
  }, 1500)

  // @Watch('tab')
  // watchTab(tab: string) {
  //   if (tab === 'todo') {
  //     return
  //   }
  // }

  // @Watch('allList')
  // handleWatch() {
  //   this.canUpdate && this.updateTask()
  //   this.canUpdate = true
  // }

  // private updateTask() {
  //   console.log(this)
  //   updateItemsApi({ content: this.todoNodes }, this.listId)
  // }

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
    border-bottom: 1px dashed #dadada;
  }
  .todo-main {
    background-color: whitesmoke;
    //min-height: 375px;
    height: 100%;
    .todo-item {
      display: flex;
      //padding: 8px 0;
      .q-item__section--main {
        .q-input {
          width: 80%;
        }
        //span {
        //  min-width: 55px;
        //}
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
    .q-scrollarea {
      height: 375px;
    }
    .list-complete-item {
      transition: all 1s;
      //margin-right: 10px;
      width: 100%;
      .text-content {
        .content {
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 190px;
        }
      }
      .handle-icon {
        text-align: right;
        //padding-right: 12px;
        min-width: 85px;
        padding-top: 4px;
        padding-bottom: 4px;
        i {
          margin-left: 8px;
          cursor: pointer;
        }
      }
    }
  }
  .todo-footer {
    position: absolute;
    background: #fafafa;
    bottom: 15px;
    width: 90%;
    ::v-deep .q-field--filled .q-field__control {
      border-radius: 0;
      padding-right: 0;
    }
    ::v-deep .q-field__marginal {
      font-size: 20px;
    }
  }
}
@media (max-width: 450px) {
  .all-list {
    //height: calc(100vh - 290px);
    //height: 400px;
    //height: calc(100vh)
    flex: 1;
  }
  .todo-list {
    width: 100%;
    box-shadow: none;
    position: relative;
    left: unset;
    top: unset;
    transform: unset;
    padding: 0 24px 0 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
    .todo-main {
      flex: 1;
      //height: calc(100vh - 290px);
      //height: calc(100vh - 200px);
      .q-scrollarea {
        //height: calc(100vh - 290px);
        //height: 400px;

        height: 100%;
      }
    }
    .text-content {
      .content {
        width: 150px;
      }
    }
  }
  .todo-footer {
    padding-top: 12px;
    position: sticky !important;
    width: 100% !important;
  }
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  //position: absolute;
}
.select-label {
  ::v-deep .q-field__native {
    span {
      //line-height: 44px;
      width: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  ::v-deep .q-field__append {
    padding-left: 0;
  }
}
::v-deep .q-tree__node--selected .q-tree__node-header-content {
  background: #dadada;
}
::v-deep .q-tree {
  padding-bottom: 20px;
}
::v-deep .q-tree--no-connectors {
  text-align: center;
}
::v-deep .q-tab__content {
  img {
    width: 19px;
  }
}
.fs-25 {
  font-size: 25px;
}
</style>
