<template>
   <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <span class="text-primary superbold"><i class="fa fa-fire me-1"></i>{{ appName }}</span>
            </a>
            
            <span class="toggle-btn" @click="handleToggleSidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars ms-5"></i>
            </span>
           
           <div class="collapse navbar-collapse nav-top" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown d-none">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="pi pi-envelope"></i> Message
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown d-none">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                             <i class="pi pi-user"></i> {{ authStore.user?.name || 'Profile' }}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Settings</a></li>
                            <li><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </li>
                    <li class="nav-link" @click="logout"><i class="pi pi-sign-out"></i> Logout</li>
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
const appName = import.meta.env.VITE_API_APP_NAME;
function handleToggleSidebar() {
  // emits to parent    
  emit('toggle-sidebar')
}

function logout() {
  authStore.logout()
  router.push('/auth')
}
</script>
