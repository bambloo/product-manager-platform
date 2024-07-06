<script setup lang="ts">
import { useBreakpoint } from 'vuestic-ui/web-components'
import { useUiStates } from '../stores/ui-states'
import { storeToRefs } from 'pinia'
import { Ref, computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
const uiStates = useUiStates()
const { isSidebarMinimized } = storeToRefs(uiStates)

const breakpoints = useBreakpoint()

const sidebarWidth = ref('16rem')
const sidebarMinimizedWidth: Ref<string | undefined> = ref(undefined)
const isMobile = ref(false)
const isTablet = ref(false)

const onResize = () => {
  isSidebarMinimized.value = breakpoints.mdDown
  isMobile.value = breakpoints.smDown
  isTablet.value = breakpoints.mdDown
  sidebarMinimizedWidth.value = isMobile.value ? '0' : '4.5rem'
  sidebarWidth.value = isTablet.value ? '100 %' : '16rem'
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

onBeforeRouteUpdate(() => {
  if (breakpoints.mdDown) {
    isSidebarMinimized.value = true
  }
})

const isFullScreenSidebar = computed(() => isTablet.value && !isSidebarMinimized.value)
const onCloseSidebarButtonClick = () => {
  isSidebarMinimized.value = true
}
</script>

<template>
  <VaLayout
    :top="{ fixed: true, order: 2 }"
    :left="{
      fixed: true,
      absolute: breakpoints.mdDown,
      order: 1,
      overlay: breakpoints.mdDown && !isSidebarMinimized
    }"
  >
  </VaLayout>
</template>
