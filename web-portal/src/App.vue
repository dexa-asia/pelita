<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterView } from 'vue-router'

const authStore = useAuthStore()

onMounted(() => {
  authStore.restoreSession()
})
</script>

<template>
  <router-view />
</template>
