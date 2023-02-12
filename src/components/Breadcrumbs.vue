<template>
  <div class="p-16">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="home" to="/todo-sets" />
      <q-breadcrumbs-el :label="`${folder.name}`" icon="folder" :to="`/folder/${folder.fd_id}`" />
      <q-breadcrumbs-el :label="`${folder.title}`" icon="inventory" />
    </q-breadcrumbs>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TodoListProp } from '@/views/todo-list/folder.vue'

export interface BreadcrumbsProps extends TodoListProp{
  title: string
}
@Component({
  name: 'Breadcrumbs'
})
export default class Breadcrumbs extends Vue {
  @Prop()
  readonly folder?: BreadcrumbsProps
}
</script>

<style lang='scss' scoped>

</style>
