<template>
  <q-drawer
      @input="toggleSideBar"
      v-model="sidebar.opened"
      content-class="bg-grey-2"
  >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
    <q-list>
      <q-item-label header>计划好生活的每一件小事~</q-item-label>
      <q-item clickable tag="a" to="/home">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>首页</q-item-label>
<!--          <q-item-label caption>quasar.dev</q-item-label>-->
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" to="/data-statistics">
        <q-item-section avatar>
          <q-icon name="trending_up" />
        </q-item-section>
        <q-item-section>
          <q-item-label>数据统计</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable tag="a" to="/user">
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>个人中心</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    </q-scroll-area>
    <q-img class="absolute-top" src="https://image.fendy5.cn/s/GKbBFeoLIqH1sfX4/0.25" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://image.fendy5.cn/s/7pwrTAuGZDvXdIEe/0.1">
        </q-avatar>
        <div class="text-weight-bold">Fendy</div>
        <div>zf@fendy5.cn</div>
      </div>
    </q-img>
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
    return  AppModule.sidebar
  }

  private toggleSideBar() {
    AppModule.CloseSideBar()
  }

}
</script>

<style lang="scss" scoped>

</style>
