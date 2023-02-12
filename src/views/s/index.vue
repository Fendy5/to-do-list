<template>
  <div class='mt-32'>
    <to-do-list :list-id='listId' />
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
.mt-32 {
  margin-top: 32px;
}
</style>
