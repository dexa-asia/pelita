import { defineStore } from 'pinia'
import api from '@/services/api'

const APP_KEY="terracoop";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(userName, password) {
      const postData = {
        uagent: 'terracoop',
        data: JSON.stringify({ userName, password })
      }

      const response = await api.post('/auth', postData)

      if (response.data.status === 68) {
        this.user = response.data.data
        this.token = response.data.data.accessToken
        this.isAuthenticated = true

        // Optional: persist to localStorage or cookies
        //localStorage.setItem('user', JSON.stringify(this.user))
        //localStorage.setItem('token', this.token)

        localStorage.setItem(`${APP_KEY}_user`, JSON.stringify(this.user))
        localStorage.setItem(`${APP_KEY}_token`, this.token)

        return true
      } else {
        throw new Error(response.data.data || 'Login failed')
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem(`${APP_KEY}_user`)
      localStorage.removeItem(`${APP_KEY}_token`)
    },
    restoreSession() {
        try {
            //const userRaw = localStorage.getItem('user')
            //const token = localStorage.getItem('token')

            const userRaw = localStorage.getItem(`${APP_KEY}_user`)
            const token = localStorage.getItem(`${APP_KEY}_token`)


            if (userRaw && token) {
                //console.log('[restoreSession] Raw user data:', userRaw)
                const user = JSON.parse(userRaw)

                this.user = user
                this.token = token
                this.isAuthenticated = true
            } else {
                this.logout() // clean up if something is wrong
            }
        } catch (err) {
            console.error('Session restore failed:', err)
            this.logout() // fallback: clear broken session
        }
    }

  }
})
