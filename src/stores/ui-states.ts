import { defineStore } from 'pinia'

export const useUiStates = defineStore('ui-states', {
  state: () => {
    return {
      isSidebarMinimized: false
    }
  },
  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    }
  }
})
