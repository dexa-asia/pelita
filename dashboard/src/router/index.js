import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import { useAuthStore } from '@/stores/auth' // import this

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/site/Home.vue'),
          meta:{requiresAuth:true}
        }
      ]
    },
    {
      path: '/auth',
      component: BlankLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/site/Login.vue'),
          meta:{'title':'Login - Pelita','requiresAuth':false}
        },
        {
          path: 'register',
          name: 'auth-register',
          component: () => import('@/views/site/Register.vue'),
          meta:{'title':'Register - Pelita','requiresAuth':false}
        },
      ]
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/site/Logout.vue'),
    },
     {
      path: '/member',
      component:MainLayout,
      meta: {
        requiresAuth: true,
        title:'Anggota',
      },
      children:[
        {
          path:'',
          name:'member-index',
          component:() => import('@/views/member/Index.vue'),
          meta:{title:'Anggota Aktif'}
        },
        {
          path:'view/:memberId',
          name:'member-view',
          component:() => import('@/views/member/View.vue'),
          meta:{title:'Detail Anggota'}
        }
      ]
    },
    {
      path: '/user',
      component:MainLayout,
      meta: {
        requiresAuth: true,
        title:'Pengguna',
      },
      children:[
        {
          path:'',
          name:'usr-index',
          component:() => import('@/views/user/Index.vue'),
          meta:{title:'Semua Pengguna'}
        },
        {
          path:'view/:memberId',
          name:'usr-view',
          component:() => import('@/views/user/View.vue'),
          meta:{title:'Detail User'}
        },
        {
          path:'password/:memberId',
          name:'usr-password',
          component:() => import('@/views/user/Password.vue'),
          meta:{title:'Ubah Password'}
        },
      ]
    }
    
    
  ]
})

// 🛡️ Auth Guard
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Pelita';
  const auth = useAuthStore()

  if (!auth.isAuthenticated) {
    auth.restoreSession()
  }
  
  // Check auth requirement
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
