<script setup lang="ts">
import { useBreakpoint } from 'vuestic-ui/web-components'
import { useUiStates } from '../stores/ui-states'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const uiStates = useUiStates()
const breakpoints = useBreakpoint()

const { isSidebarMinimized } = storeToRefs(uiStates)
const sidebarWidth = ref('16rem')
const sidebarMinimizedWidth = ref(undefined)
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
