// stores/useAppStore.js
import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', {
  state: () => ({
    activeGroup: null
  }),
  actions: {
    setActiveGroup(group) {
      this.activeGroup = group
    }
  },
  persist:true
})
