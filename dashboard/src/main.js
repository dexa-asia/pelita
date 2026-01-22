import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/site.css'
import './assets/css/site-dark.css'
import "primeicons/primeicons.css";
import '@fortawesome/fontawesome-free/css/all.css';
import 'sweetalert2/dist/sweetalert2.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import api from '@/services/api'

const app = createApp(App)

// Create pinia instance and register plugin
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.config.globalProperties.$axios = api;

app.use(pinia)
app.use(VueSweetalert2)
app.use(router)

app.mount('#app')
