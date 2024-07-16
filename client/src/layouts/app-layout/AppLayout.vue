<script setup lang="ts">
import { useBreakpoint, useToast } from '../../vuestic-ui/main'
import { useUiStates } from '../../stores/ui-states'
import { storeToRefs } from 'pinia'
import { Ref, computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import CommonLayout from '../common-layout/CommonLayout.vue'
import CommonLayoutTopLine from '../common-layout/CommonLayoutTopLine.vue'
import MainNavbar from '../../components/navbar/MainNavbar.vue'
import { post } from '../../scripts/request'

const uiStates = useUiStates()
const { isSidebarMinimized } = storeToRefs(uiStates)
const { init } = useToast()

const breakpoints = useBreakpoint()

const sidebarWidth = ref('16rem')
const sidebarMinimizedWidth: Ref<string | undefined> = ref(undefined)
const isMobile = ref(false)
const isTablet = ref(false)

const route = useRoute()

const isReady = ref(false)

interface Column {
  name: string
  label: string
}

const columns: Ref<Column[]> = ref([])
const column: Ref<string> = ref('')

const onResize = () => {
  isSidebarMinimized.value = breakpoints.mdDown
  isMobile.value = breakpoints.smDown
  isTablet.value = breakpoints.mdDown
  sidebarMinimizedWidth.value = isMobile.value ? '0' : '4.5rem'
  sidebarWidth.value = isTablet.value ? '100 %' : '16rem'
}
function loadColumns() {
  return post('/wpi/column/list', {}).then((packet) => {
    let data = packet.data
    columns.value = data

    const column_set = new Set()
    data.forEach((element) => {
      column_set.add(element.name)
    })

    console.log(route.path)
    const column_in_route = route.path.replace('/home/', '').replace('/', '').toLowerCase()
    if (column_in_route.length && column_set.has(column_in_route)) {
      column.value = column_in_route
    } else {
      column.value = columns.value[0].name
    }
    isReady.value = true
  })
}

onMounted(() => {
  window.addEventListener('resize', onResize)
  onResize()

  window.addEventListener('unhandledrejection', (event) => {
    init({
      message: event.reason.msg,
      duration: 3000
    })
    event.preventDefault()
  })
  Promise.resolve().then(() => loadColumns())
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
const navbarContainer = ref(null)
const sidebarStyle = computed(() => {
  if (navbarContainer.value) {
    console.log((navbarContainer.value as any).offsetHeight)
    return {
      'padding-top': `${(navbarContainer.value as any).offsetHeight}px`,
      positon: 'fixed',
      'padding-left': `calc((100% - var(--va-max-screen-width)) / 2)`
    }
  } else {
    return {}
  }
})

const contentStyle = computed(() => {
  return {}
})
</script>

<template>
  <CommonLayout v-if="isReady">
    <template #top>
      <MainNavbar :is-mobile="isMobile" />
      <CommonLayoutTopLine>
        <VaTabs v-model="column" class="tabs">
          <template #tabs>
            <VaTab
              v-for="column in columns"
              :key="column.name"
              :name="column.name"
              :to="{ path: `/home/${column.name}` }"
            >
              {{ column.label }}
            </VaTab>
          </template>
        </VaTabs>
      </CommonLayoutTopLine>
    </template>
  </CommonLayout>
  <!-- <div class="navbar-container" ref="navbarContainer">
    <div class="navbar-line"><MainNavbar :is-mobile="isMobile" /></div>
    <div class="navbar-line">dfaefe</div>
    <div class="navbar-line">dfaewfaefaewf</div>
  </div>-->
  <!-- <div class="sidebar-container" :style="sidebarStyle" ref="sidebarContainer">
    awefawesfawefewfef
  </div> -->
  <!--
  <div :style="contentStyle" ref="contentContainer"><RouterView /></div>
  -->
</template>

<style lang="scss" scoped>
// * {
//   border: 2px solid black;
// }
// Prevent icon jump on animation
.va-sidebar {
  width: unset !important;
  min-width: unset !important;
}
.navbar-container {
  position: fixed;
  width: 100%;
  min-width: 100%;
  justify-content: center;
}
.sidebar-container {
  display: flex;
  position: fixed;
}
.navbar-line {
  width: 100%;
}
.tabs {
  width: 100%;
  padding-top: 32px;
}
</style>
