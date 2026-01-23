<template>
    <div class="login-container bg-me-gradient">
        <div class="login-box bg-white">
            <div class="login-left">
              <img src="@/assets/images/identities/logo.png" alt="Login Image" class="img-logo"/>  
            </div>
            <div class="login-right">
                <div class="login-title">Selamat Datang</div>
                <form @submit.prevent="login" role="form">
                    <input type="text" placeholder="Username" required v-model="userName">
                    <input type="password" placeholder="Password" required v-model="password">
                    <button class="mt-1 me-3 btn btn-danger" type="submit">Login</button>
                    <div class="smaller mt-5 text-secondary">Pelita - Copyright &copy2026</div>
                </form>
            </div>

        </div>
    </div>
</template>
<style>
.login-container{width:100%;display:flex;justify-content:center;align-items:center;height:100vh;}
.login-box{width:45%;display:flex;box-shadow:0 4px 10px var(--me-trans-primary);border-radius:30px;color:var(--me-primary)}
.login-left{flex:1;display: flex;justify-content: center;align-self: center;}
.login-left .img-logo{width:40%}
.login-right{flex:1;padding:40px;display:flex;flex-direction:column;justify-content:center;border-radius:30px}
.login-right h2{margin-bottom:20px;font-size:24px;color:#333;text-align:center}
.login-right input{width:100%;padding:10px;margin-bottom:10px;border:1px solid #ccc;border-radius:4px}
.login-right button{width:100%;padding:10px;border-radius:4px;cursor:pointer;font-weight:500;}
.login-title{font-weight: 600;font-size: 1.5em;margin-bottom: 20px;}

</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const userName = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

async function login() {
  try {
    const success = await authStore.login(userName.value, password.value)
    if (success) {
      router.push('/')
    }
  } catch (err) {
    console.error('Login failed:', err)
    window.Swal?.fire({
      title: 'Login Failed',
      text: err.message || 'Please check your credentials.',
      icon: 'error',
      confirmButtonText: 'Try Again',
    })
  }
}
</script>
