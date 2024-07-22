<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, computed, Ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { validate_token } from '../../scripts/token'

import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate } from 'vue-router'
import { useBreakpoint } from '../../vuestic-ui/composables'
import { useUiStates } from '../../stores/ui-states'
import AdminNavbar from '../../components/navbar/AdminNavbar.vue'
import AdminSidebar from '../../components/sidebar/AdminSidebar.vue'

const isReady = ref(false)
const sidebarMinimizedWidth: Ref<undefined | string> = ref(undefined)

onMounted(() => {
  return validate_token()
    .then(() => {
      isReady.value = true
      window.addEventListener('resize', onResize)
      onResize()
    })
    .catch(() => {
      useRouter().replace({ name: 'login' })
    })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

onBeforeRouteUpdate(() => {
  if (breakpoints.mdDown) {
    // Collapse sidebar after route change for Mobile
    isSidebarMinimized.value = true
  }
})

const uiStates = useUiStates()
const breakpoints = useBreakpoint()

const sidebarWidth = ref('16rem')

const isMobile = ref(false)
const isTablet = ref(false)
const { isSidebarMinimized } = storeToRefs(uiStates)

const onResize = () => {
  isSidebarMinimized.value = breakpoints.mdDown
  isMobile.value = breakpoints.smDown
  isTablet.value = breakpoints.mdDown
  sidebarMinimizedWidth.value = isMobile.value ? '0' : '4.5rem'
  sidebarWidth.value = isTablet.value ? '100%' : '16rem'
}

const isFullScreenSidebar = computed(() => isTablet.value && !isSidebarMinimized.value)

const onCloseSidebarButtonClick = () => {
  isSidebarMinimized.value = true
}
</script>

<template>
  <div v-if="isReady">
    <VaLayout
      :top="{ fixed: true, order: 2 }"
      :left="{
        fixed: true,
        absolute: breakpoints.mdDown,
        order: 1,
        overlay: breakpoints.mdDown && !isSidebarMinimized
      }"
      @leftOverlayClick="isSidebarMinimized = true"
    >
      <template #top>
        <AdminNavbar :is-mobile="isMobile" />
      </template>

      <template #left>
        <AdminSidebar :minimized="isSidebarMinimized" />
      </template>

      <template #content>
        <div :class="{ minimized: isSidebarMinimized }" class="app-layout__sidebar-wrapper">
          <div v-if="isFullScreenSidebar" class="flex justify-end">
            <VaButton
              class="px-4 py-4"
              icon="md_close"
              preset="plain"
              @click="onCloseSidebarButtonClick"
            />
          </div>
        </div>
        <AppLayoutNavigation v-if="!isMobile" class="p-4" />
        <main class="p-4 pt-0">
          <article>
            <RouterView />
          </article>
        </main>
      </template>
    </VaLayout>
  </div>
</template>
