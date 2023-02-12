<template>
  <div class="relative">
    <breadcrumbs :folder='folder' />
    <to-do-list @folder='setFolder' :list-id="listId" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import ToDoList from '@/components/ToDoList.vue'
import Breadcrumbs, { BreadcrumbsProps } from '@/components/Breadcrumbs.vue'

@Component({
  name: 'TodoListDetail',
  components: {
    Breadcrumbs,
    ToDoList
  }
})

export default class TodoListDetail extends Vue {
  private listId = this.$route.params.id
  private folder: BreadcrumbsProps = {
    title: '',
    folder_id: '',
    id: 0,
    is_top: false,
    list_id: '',
    name: ''
  }

  private setFolder(folder: BreadcrumbsProps) {
    this.folder = folder
  }
}
</script>
