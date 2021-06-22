<template>
  <q-drawer
      @input="toggleSideBar"
      v-model="sidebar.opened"
      content-class="bg-grey-2"
  >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
    <q-list>
      <q-item-label header>计划好生活的每一件小事~</q-item-label>
      <template v-for="(i,index) in routes">
        <q-item :key="index"  clickable tag="a" v-if="!i.meta.hidden" :to="i.path">
          <q-item-section avatar>
            <q-icon :name="i.meta.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ i.meta.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
<!--      <q-item clickable tag="a" to="/user">-->
<!--        <q-item-section avatar>-->
<!--          <q-icon name="account_circle" />-->
<!--        </q-item-section>-->
<!--        <q-item-section>-->
<!--          <q-item-label>个人信息</q-item-label>-->
      <!--          <q-item-label caption>quasar.dev</q-item-label>-->
<!--        </q-item-section>-->
<!--      </q-item>-->
    </q-list>
    </q-scroll-area>
    <q-img class="absolute-top" src="https://image.fendy5.cn/s/GKbBFeoLIqH1sfX4/0.25" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img :src="avatar">
        </q-avatar>
        <div class="text-weight-bold">{{ nickname }}</div>
        <div>{{ email }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {AppModule} from "@/store/modules/app"
import { UserModule } from "@/store/modules/user"

@Component({
  name: 'Sidebar'
})

export default class extends Vue {

  created() {
    this.token && UserModule.GetUserInfo()
  }

  get routes() {
    return this.$router.options.routes && this.$router.options.routes[0].children
  }

  get token() {
    return UserModule.token
  }

  get sidebar() {
    return  AppModule.sidebar
  }

  get avatar() {
    return UserModule.user.avatar
  }

  get email() {
    return UserModule.user.email
  }

  get nickname() {
    return UserModule.user.nickname
  }

  private toggleSideBar() {
    AppModule.CloseSideBar()
  }

}
</script>

<style lang="scss" scoped>

</style>
