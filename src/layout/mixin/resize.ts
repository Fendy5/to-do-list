import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {

  get sidebar() {
    console.log(AppModule.sidebar.opened)
    return AppModule.sidebar
  }

  @Watch('$route')
  private onRouteChange() {
    if (this.sidebar.opened) {
      AppModule.CloseSideBar()
    }
  }
}
