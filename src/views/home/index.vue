<template>
  <div class="relative min-h">
    <to-do-list v-if="listId" :list-id="listId" />
    <q-spinner-cube v-else class="center" size="5em" color="primary" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import ToDoList from '@/components/ToDoList.vue'
import {getTodayListApi} from "@/api/todo-lists"

@Component({
  name: 'TodoListDetail',
  components: {
    ToDoList
  }
})

export default class Folder extends Vue {
  private listId = ''

  created() {
    getTodayListApi().then(val => {
      this.listId = val.data
    })
  }

}
</script>

<style lang='scss'>
.min-h {
  min-height: 750px;
}
</style>
