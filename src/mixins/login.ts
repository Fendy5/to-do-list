import { Component, Vue } from 'vue-property-decorator'
import {isValidateEmail} from "@/utils/validate"

@Component({
  name: 'loginMixin'
})

export default class extends Vue {
  public loginForm = {
    email: '',
    password: ''
  }

  // private validatePassword = () => {
  //
  // }

  public validateEmail = () => {
    if (!isValidateEmail(this.loginForm.email)) {
      return '邮箱格式不正确'
      // this.$q.notify({
      //   type: 'negative',
      //   message: `邮箱格式不正确`
      // })
    }
  }

}
