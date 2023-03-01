import Echo from 'laravel-echo'
import { UserModule } from '@/store/modules/user'

export const echo = new Echo({
  broadcaster: 'pusher',
  key: 'ws_todo',
  auth: { headers: { 'Authorization': 'Bearer ' + UserModule.token, Accept: 'application/json' } },
  cluster: 'mt1',
  authEndpoint: `${process.env.VUE_APP_BASE_API}/api/v1/broadcasting/auth`,
  // authEndpoint: `https://todo.fendy5.cn/api/v1/broadcasting/auth`,
  forceTLS: false,
  wsPort: 6001,
  // wsHost: '127.0.0.1',
  wsHost: 'todo.fendy5.cn',
  encrypted: true,
  enabledTransports: ['ws', 'wss']
})
