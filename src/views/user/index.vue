<template>
  <div class="user center shadow">
    <q-avatar
      class="avatar block mx-auto mb-32 cursor-pointer"
      size="96px"
      @click="changeAvatar"
    >
      <img :src="form.avatar">
    </q-avatar>
    <div v-if="edit===0">
      <div class="user-item">
        <div class="text-secondary">昵称</div>
        <div class="">{{ user.nickname }}</div>
      </div>
      <div class="user-item">
        <div class="text-secondary">邮箱</div>
        <!--      <q-input  placeholder="请输入邮箱" />-->
        <div class="">{{ user.email }}</div>
      </div>
      <div class="user-item">
        <div class="text-secondary">微信</div>
        <div class="">{{ user.openid?'已绑定':'未绑定' }}</div>
      </div>
      <div class="btn fx-between">
        <q-btn outline @click="changeEdit(1)" style="color: goldenrod;" label="修改信息"/>
        <q-btn outline @click="logout" style="color: indianred;" label="退出登录"/>
      </div>
    </div>
    <div v-else>
      <div class="input-item">
        <div class="text-secondary lh-42">昵称</div>
        <q-input placeholder="请输入昵称" v-model="form.nickname"/>
      </div>
      <div class="input-item">
        <div class="text-secondary lh-42">邮箱</div>
        <q-input placeholder="请输入邮箱" v-model="form.email"/>
      </div>
      <div class="input-item">
        <div class="text-secondary lh-42">密码</div>
        <q-input placeholder="请输入密码" type="password" v-model="form.password"/>
      </div>
      <div class="input-item">
        <div class="text-secondary lh-42">微信</div>
        <div v-if="user.openid" class="lh-42">已绑定</div>
        <div v-else class="lh-42 text-primary">
          <span @click="bindWechat" class="cursor-pointer">绑定</span>
        </div>
      </div>
      <div class="btn fx-around">
        <q-btn
            outline
            style="color: #a5a2a2;"
            @click="changeEdit(0)"
            label="取消"
        />
        <q-btn
            outline
            @click="saveUser"
            class="text-primary"
            label="保存"
        />
      </div>
    </div>
    <q-dialog transition-show="flip-down" transition-hide="flip-up" v-model="dialog">
      <q-card class="p-24">
        <div ref="qrcode"></div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import {getUserInfo, updateAvatarApi, updateUserApi, uploadAvatarApi} from "@/api/users"
import {UserModule} from "@/store/modules/user"

@Component({
  name: 'User'
})

export default class User extends Vue {
  private form = {
    nickname: '',
    openid: '',
    avatar: '',
    password: '********',
    email: ''
  }
  private user = {
    nickname: '',
    avatar: '',
    openid: '',
    email: ''
  }
  private edit = 0
  private dialog = false

  bindWechat() {
    const QRCode = require('qrcodejs2')
    this.dialog = true
    this.$nextTick(() => {
      new QRCode(this.$refs.qrcode, `https://todo.fendy5.cn/api/v1/wechat/login?email=${this.user.email}&bind=1`)
    })
  }

  created() {
    this.initPage()
  }

  logout() {
    this.$q.dialog({
      title: '警告',
      message: '是否确认退出？',
      cancel: '取消',
      ok: '确定',
      persistent: true
    }).onOk(() => {
      UserModule.ResetToken()
      this.$router.push('/login')
    })
  }

  initPage() {
    getUserInfo().then(value => {
      this.user = value.data
      this.form = value.data
      this.form['password'] = '********'
    })
  }

  changeEdit(index:number) {
    this.edit = index
  }

  saveUser() {
    updateUserApi(this.form).then( () => {
      this.initPage()
      this.edit = 0
      UserModule.SetUser(this.form)
    })
  }

  changeAvatar() {
    const file = document.createElement('input')
    file.setAttribute('type', 'file')
    file.setAttribute('name', 'image')
    const image = new FormData()
    file.addEventListener('change', () => {
      image.append('image', (file as any).files[0])
      image.append('25%', 'true')
      uploadAvatarApi(image).then(value => {
        this.form.avatar = value.image_url
        updateAvatarApi({avatar: value.image_url})
        UserModule.SetUser(this.form)
      })
    })
    file.click()
  }
}

</script>

<style lang="scss" scoped>
@import "../../styles/index";

.user {
  width: 480px;
  background: #fff;
  height: 560px;
  padding: 32px 24px;
  .btn {
    width: 250px;
    position: absolute;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.user-item {
  @extend .grid-1_1;
  @extend .w-250;
  @extend .mx-auto;
  @extend .py-24
}
.input-item {
  @extend .grid-1_2;
  @extend .w-250;
  @extend .mx-auto;
  @extend .py-8
}
@media (max-width: 500px) {
  .user {
    width: 100%;
    box-shadow: none;
    position: relative;
    left: unset;
    top: unset;
    transform: unset;
    padding: 0 24px 24px 24px;
  }
  .avatar {
    padding-top: 24px;
    img{
      object-fit: fill;
    }
  }
}
::v-deep .q-field__control {
  height: 42px;
}
</style>
