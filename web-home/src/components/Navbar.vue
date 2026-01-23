<template>
   <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
           <div class="collapse navbar-collapse nav-top" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <li class="nav-link">
                        <router-link to="/">Beranda</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tentang
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Profil</a></li>
                            <li><a class="dropdown-item" href="#">MPP</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Pengurus</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Jaringan
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">DPP</a></li>
                            <li><a class="dropdown-item" href="#">DPD</a></li>
                            <li><a class="dropdown-item" href="#">DPC</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                             <i class="pi pi-user"></i> {{ authStore.user?.name || 'Profile' }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleToggleSidebar() {
  // emits to parent    
  emit('toggle-sidebar')
}

function logout() {
  authStore.logout()
  router.push('/auth')
}
</script>
