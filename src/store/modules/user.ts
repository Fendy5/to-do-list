import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { setToken, removeToken } from '@/utils/cookies'
import store from '@/store'
import { getUserInfo, login } from '@/api/users'

export interface UserInfo {
  id: number
  nickname: string
  avatar: string
  openid: string
  email: string
}

export interface IUserState {
  token: string
  user: UserInfo
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = ''
  public user = {
    id: 0,
    nickname: '',
    avatar: '',
    openid: '',
    email: ''
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_USER(user: UserInfo) {
    this.user = user
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
  }

  @Action
  public async Login(userInfo: { email: string, password: string }) {
    try {
      const { data } = await login(userInfo)
      if (data.token) {
        setToken(data.token)
        this.SET_TOKEN(data.token)
      }
    } catch (e) {

    }
  }

  @Action
  public SetToken(token: any) {
    setToken(token)
    this.SET_TOKEN(token)
  }

  @Action({rawError: true})
  public async GetUserInfo() {
    const { data } = await getUserInfo()
    if (data.token) {
      const token = data.token
      setToken(token)
      this.SET_TOKEN(token)
      this.SET_USER(data)
      return true
    } else {
      return false
    }
  }

  @Action
  public SetUser(user: UserInfo) {
    this.SET_USER(user)
  }

}

export const UserModule = getModule(User)
