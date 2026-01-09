import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const auth = useAuthStore()
      // clear session
      auth.logout()
      // redirect to login
      router.replace({
        name: 'login',
        query: { redirect: router.currentRoute.value.fullPath }
      })
    }

    return Promise.reject(error)
  }
)

api.interceptors.request.use(config => {
  const auth = useAuthStore()
  if (auth.token) {
    //config.headers.Authorization = `Bearer ${auth.token}`
    config.headers.token = `${auth.token}`
  }
  return config
})

export default api
