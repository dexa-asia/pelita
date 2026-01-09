<template>
  <nav id="sidebar" :class="{ 'collapsed': isCollapsed }" class="sidebar">      
      <ul class="nav flex-column">
          <li class="nav-item">
              <a class="nav-link active" href="/"><i class="pi pi-chart-bar text-me"></i> Dashboard</a>
          </li>
            <submenu-item 
              :submenu-name="'Anggota'" 
              :submenu-items="memNav"
              :submenu-icon="'pi pi-users'">
            </submenu-item>
            
            <hr/>
            <submenu-item 
              :submenu-name="'DPW'" 
              :submenu-items="dpwNav"
              :submenu-icon="'pi pi-building text-me'">
            </submenu-item>

            <submenu-item 
              :submenu-name="'Master'" 
              :submenu-items="masterNav"
              :submenu-icon="'pi pi-folder text-me'">
            </submenu-item>

             <submenu-item 
              :submenu-name="'Account'" 
              :submenu-items="userNav"
              :submenu-icon="'pi pi-users text-me'">
            </submenu-item>

          <!-- Add more sidebar items as needed -->
      </ul>

  </nav>
    
</template>

<script>
import SubmenuItem from './SubmenuItem.vue';
export default {
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  components:{
    SubmenuItem,
  },
  data(){
    return {
        memNav: [
            { label: 'Anggota Aktif', route: '/member' },
            { label: 'Anggota Non Aktif', route: '/member/inactive' },
        ],

        
        masterNav: [
            { label: 'Produk Simpanan', route: '/product/saving' },
            { label: 'Produk Pembiayaan', route: '/product/lending' },
            
        ],
        userNav: [
            { label: 'All User', route: '/user' },
            { label: 'Administrator', route: '/user/admin' },
            { label: 'Blocked', route: '/user/blocked' },
            { label: 'Access Control', route: '/user/control' },
            { label: 'Log', route: '/user/log' },
        ],
        
    }
  }
};
</script>

