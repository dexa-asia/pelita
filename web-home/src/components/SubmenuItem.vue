<template>
  
  <li class="nav-item">
      <a class="nav-link d-flex" @click="toggleSubmenu">
        <i :class="submenuIcon" class="flex-column-1 align-self-center me-2 menu-icon"></i> <span class="align-self-center">{{submenuName}}</span>
        <i :class="{'pi pi-angle-down ms-auto align-self-center': isSubmenuOpen, 'pi pi-angle-right text-secondary ms-auto align-self-center': !isSubmenuOpen}"></i>
      </a>
      
        <ul v-show="isSubmenuOpen" class="submenu">
          <li class="nav-item" v-for="(item, index) in submenuItems" :key="index">
            <template v-if="item.label ==='-'">
              <hr/>
            </template>
            <template v-else>
              <router-link class="nav-link" :to="item.route">{{ item.label }}</router-link>
            </template>
            
          </li>
        </ul>
      
  </li>
</template>

<script>
export default {
  props: {
    submenuName: String,
    submenuItems: Array, // Array of submenu items with { label, route } objects
    submenuIcon: String,
  },
  data() {
    return {
      isSubmenuOpen: false,
    };
  },
  methods: {
    toggleSubmenu() {
      this.isSubmenuOpen = !this.isSubmenuOpen;
    },
  },
};
</script>
