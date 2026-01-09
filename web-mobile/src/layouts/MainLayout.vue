
<script setup>
import {ref} from 'vue';
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useAuthStore } from '@/stores/auth';

const user = useAuthStore().user;
const isCollapsed = ref(false);

function toggleSidebar(){
  isCollapsed.value = !isCollapsed.value
}
</script>



<template>
    <div>
        <Navbar @toggle-sidebar="toggleSidebar" />
        <div class="container-fluid">
            <div class="row">
                <Sidebar :isCollapsed="isCollapsed" />
                <main  :class="{ 'collapsed': isCollapsed }" class="col main-content flex-grow-1">
                    <router-view></router-view>
                </main>
            </div>
        </div>

        <footer class="footer">
            <div class="container d-flex justify-content-center">
              <div class="me-2"><span class="smaller"><small>PETUGAS</small> : <span class="text-bold">{{ user.name }}</span></span></div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
   .container-fluid, .row {height: calc(100vh - 100px); /* Adjust as needed */}
   .main-content {margin-left: 0px;transition: margin-left 0.3s ease;padding: 20px 10px 10px 20px;overflow-y:auto; max-height: calc(100vh - 100px);}
   .main-content {transition: width 0.3s ease;}
   .footer{padding: 8px;background-color:transparent!important}
   .footer{color:#000;font-size:.9em}
</style>