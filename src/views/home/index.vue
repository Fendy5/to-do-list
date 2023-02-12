<template>
  <div class="relative min-h">
    <breadcrumbs :folder='folder'/>
    <to-do-list @folder='e => { folder=e }' v-if="listId" :list-id="listId" />
    <q-spinner-cube v-else class="center" size="5em" color="primary" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import ToDoList from '@/components/ToDoList.vue'
import {getTodayListApi} from "@/api/todo-lists"
import Breadcrumbs, { BreadcrumbsProps } from '@/components/Breadcrumbs.vue'

@Component({
  name: 'TodoListDetail',
  components: {
    Breadcrumbs,
    ToDoList
  }
})

export default class Folder extends Vue {
  private listId = ''
  private folder: BreadcrumbsProps = {
    title: '',
    folder_id: '',
    id: 0,
    is_top: false,
    list_id: '',
    name: ''
  }

  async created() {
    const { data: { listId } } = await getTodayListApi()
    this.listId = listId
  }

}
</script>

<style lang='scss'>
.min-h {
  min-height: 750px;
}
</style>
