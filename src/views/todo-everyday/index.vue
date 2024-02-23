<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ToDoList from '@/components/ToDoList.vue'
import { todoEveryDayApi } from '@/api/todo-lists'

@Component({
  name: 'TodoEveryday', components: { ToDoList }
})
export default class index extends Vue {
  private listId: string | null = null

  created() {
    this.getTodoEveryDay()
  }

  async getTodoEveryDay() {
    const { data } = await todoEveryDayApi()
    this.listId = data
  }
}
</script>

<template>
  <div class="relative">
    <to-do-list  v-if="listId" :list-id="listId"/>
  </div>
</template>

<style scoped lang="scss">

</style>
