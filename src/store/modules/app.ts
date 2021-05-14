import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import {getSidebarStatus, setSidebarStatus} from "@/utils/cookies"
import store from '@/store'

export interface IAppState {
  sidebar: {
    opened: boolean
  }
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: getSidebarStatus() !== 'closed'
  }

  @Mutation
  private TOGGLE_SIDEBAR() {
    this.sidebar.opened = !this.sidebar.opened
    if (this.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }

  @Mutation
  private CLOSE_SIDEBAR() {
    this.sidebar.opened = false
    setSidebarStatus('closed')
  }

  @Action
  public ToggleSideBar() {
    this.TOGGLE_SIDEBAR()
  }

  @Action
  public CloseSideBar() {
    this.CLOSE_SIDEBAR()
  }

}

export const AppModule = getModule(App)
