<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[64, 64]">
      <q-fab
          icon="add"
          direction="up"
          color="primary"
      >
        <q-fab-action @click="prompt=true" color="primary" >
          <template>
            <svg-icon class="text-white wh-30" icon-class="folder" />
          </template>
        </q-fab-action>
        <q-fab-action @click="prompt=true" color="primary"  >
          <template>
            <svg-icon class="text-white wh-25" icon-class="todo-list" />
          </template>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">名称</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="name" autofocus @keyup.enter="prompt=false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat label="确定" @click="add" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'PageSticky'
})
export default class PageSticky extends Vue {
  private name = ''
  private prompt = false

  private add() {
    this.$emit('click', this.name)
    this.prompt = false
    this.name = ''
  }

}
</script>

<style lang="scss" scoped>

</style>
