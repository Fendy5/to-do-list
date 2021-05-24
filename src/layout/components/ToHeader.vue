<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
          flat
          dense
          round
          @click="toggleSideBar"
          aria-label="Menu"
          icon="menu"
      />

      <q-toolbar-title>
        <router-link class="text-white" to="/"> To Do List </router-link>
      </q-toolbar-title>

      <div class="date">{{ today }}</div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {AppModule} from '@/store/modules/app'

@Component({
  name: 'Header'
})
export default class extends Vue {
  private toggleSideBar() {
    AppModule.ToggleSideBar()
  }

  private today = ''

  created() {
    const date = new Date()
    this.today = `${date.getMonth()+1}月${date.getDate()}日`
  }

}
</script>

<style lang="scss" scoped>
.q-header {
  box-shadow: 0 2px 15px #ad7af1;
}
.date {
  font-size: 18px;
  font-weight: 500;
}
a {
  text-decoration: none;
}
</style>
