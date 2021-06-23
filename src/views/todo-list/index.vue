<template>
  <div class="relative">
    <to-do-list :list-id="listId" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import ToDoList from '@/components/ToDoList.vue'

@Component({
  name: 'TodoListDetail',
  components: {
    ToDoList
  }
})

export default class Folder extends Vue {
  private listId = this.$route.params.id
}
</script>
