import { Component, Vue } from 'vue-property-decorator'
import {isValidateEmail} from "@/utils/validate"

@Component({
  name: 'loginMixin'
})

export default class extends Vue {
  public loginForm = {
    email: 'zf@fendy5.cn',
    password: '123456'
  }

  // private validatePassword = () => {
  //
  // }

  public validateEmail = () => {
    if (!isValidateEmail(this.loginForm.email)) {
      this.$q.notify({
        type: 'negative',
        message: `邮箱格式不正确`
      })
    }
  }

}
