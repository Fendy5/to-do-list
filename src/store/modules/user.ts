import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import store from '@/store'
import {getUserInfo, login} from "@/api/users"

export interface UserInfo {
  nickname: string
  avatar: string
  introduction: string
  email: string
}

export interface IUserState {
  token: string
  user: UserInfo
}

@Module({dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public user = {
    nickname: '',
    avatar: '',
    introduction: '',
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
  public async Login(userInfo: { email: string, password: string}) {
    try {
      const { data } = await login(userInfo)
      if (data.token) {
        setToken(data.token)
        this.SET_TOKEN(data.token)
      }
    }catch (e) {

    }
  }

  @Action
  public SetToken(token: string) {
    setToken(token)
    this.SET_TOKEN(token)
  }

  @Action
  public async GetUserInfo() {
    getUserInfo().then(value => {
      const user = {
        nickname: value.data.nickname,
        introduction: value.data.introduction,
        avatar: value.data.avatar,
        email: value.data.email
      }
      this.SET_USER(user)
    })
  }

  @Action
  public SetUser(user: UserInfo) {
    this.SET_USER(user)
  }

}

export const UserModule = getModule(User)
