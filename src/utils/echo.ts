import Echo from 'laravel-echo'
import { UserModule } from '@/store/modules/user'

export const echo = new Echo({
  broadcaster: 'pusher',
  key: 'ws_todo',
  auth: { headers: { 'Authorization': 'Bearer ' + UserModule.token } },
  cluster: 'mt1',
  authEndpoint: '/web/broadcasting/auth',
  // forceTLS: false,
  // wsPort: 6001,
  wsHost: 'todo.fendy5.cn',
  encrypted: true,
  enabledTransports: ['ws', 'wss']
})
