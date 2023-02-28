import Echo from 'laravel-echo'
import { UserModule } from '@/store/modules/user'

export const echo = new Echo({
  broadcaster: 'pusher',
  key: 'ws_todo',
  auth: { headers: { 'Authorization': 'Bearer ' + UserModule.token, Accept: 'application/json' } },
  cluster: 'mt1',
  authEndpoint: '/dev-api/broadcasting/auth',
  forceTLS: false,
  // wsPort: 6001,
  wsHost: '/ws',
  encrypted: true,
  enabledTransports: ['ws', 'wss']
})
