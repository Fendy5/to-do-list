<template>
  <div class='share'>
    <to-do-list :is-disabled='true' :list-id='listId' />
<!--    <q-input @blur='handleBlur' v-model='form' placeholder="添加任务" />-->
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import ToDoList from '@/components/ToDoList.vue'

@Component({
  name: 'ShareTodoList',
  components: { ToDoList }
})

export default class ShareTodoList extends Vue {
  private listId = ''

  created() {
    const { id } = this.$route.params
    this.listId = id
  }
}
</script>

<style lang='scss' scoped>
.share {
  padding-top: 32px;
  height: 100vh;
  //height: calc(100vh - 32px);
}
</style>
