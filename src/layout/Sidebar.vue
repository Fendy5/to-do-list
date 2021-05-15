<template>
  <q-drawer
      v-model="sidebar.opened"
      show-if-above
      bordered
      content-class="bg-grey-2"
  >
    <q-list>
      <q-item-label header>Fendy</q-item-label>
      <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>首页</q-item-label>
<!--          <q-item-label caption>quasar.dev</q-item-label>-->
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" to="/random-string">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>个人中心</q-item-label>
<!--          <q-item-label caption>根据条件生成随机字符串</q-item-label>-->
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {AppModule} from "@/store/modules/app"

@Component({
  name: 'Sidebar'
})

export default class extends Vue {

  get sidebar() {
    console.log(AppModule.sidebar.opened)
    return  AppModule.sidebar
  }
}
</script>

<style lang="scss" scoped>

</style>
