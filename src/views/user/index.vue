<template>
  <div class="user center shadow">
    <q-avatar
      class="block mx-auto mb-32 cursor-pointer"
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
        <div class="text-secondary">座右铭</div>
        <div class="">计划好生活的每一件小事~</div>
      </div>
      <div class="btn text-center">
        <q-btn
          outline
          @click="changeEdit(1)"
          style="color: goldenrod;"
          label="修改信息"
        />
      </div>
    </div>
    <div v-else>
      <div class="user-item">
        <div class="text-secondary lh-56">昵称</div>
        <q-input placeholder="请输入昵称" v-model="form.nickname"/>
      </div>
      <div class="user-item">
        <div class="text-secondary lh-56">邮箱</div>
        <q-input placeholder="请输入邮箱" v-model="form.email"/>
      </div>
      <div class="btn fx-between">
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
    introduction: '',
    avatar: '',
    email: ''
  }
  private user = {
    nickname: '',
    avatar: '',
    introduction: '',
    email: ''
  }
  private edit = 0

  created() {
    this.initPage()
  }

  initPage() {
    getUserInfo().then(value => {
      this.user = value.data
      this.form = value.data
    })
  }

  changeEdit(index:number) {
    this.edit = index
  }

  saveUser() {
    updateUserApi(this.form).then(value => {
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
    width: 150px;
    position: absolute;
    bottom: 48px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.user-item {
  @extend .grid-half;
  @extend .w-250;
  @extend .mx-auto;
  @extend .py-24
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
}
</style>
