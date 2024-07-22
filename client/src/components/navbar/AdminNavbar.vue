<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStates } from '../../stores/ui-states'
import MainNavbarActions from './HomeNavbarActions.vue'

defineProps({
  isMobile: { type: Boolean, default: false }
})

const uiStates = useUiStates()
const { isSidebarMinimized } = storeToRefs(uiStates)
</script>
<template>
  <VaNavbar class="app-layout-navbar py-4 px-6" :shadowed="true">
    <template #left>
      <RouterLink to="/" :aria-lable="$t('message.back_home')">
        <div class="left">
          {{ $t('global.company') }}
        </div>
      </RouterLink>
    </template>
    <template #right>
      <MainNavbarActions class="app-navbar__actions" :is-mobile="isMobile" />
    </template>
  </VaNavbar>
</template>

<style lang="scss" scoped>
* {
  --va-max-screen-width: 100%;
}
.router-link {
  text-decoration: none;
  color: #000000;
}
.router-link-active {
  text-decoration: none;
  color: #000000;
}
.va-navbar {
  z-index: 2;
  font-size: larger;
  @media screen and (max-width: 950px) {
    .left {
      width: 100%;
    }

    .app-navbar__actions {
      display: flex;
      justify-content: space-between;
    }
  }
}

.left {
  display: flex;
  align-items: center;
  margin-left: 1rem;

  & > * {
    margin-right: 1rem;
  }

  & > *:last-child {
    margin-right: 0;
  }
}

// .icon-fade-enter-active,
// .icon-fade-leave-active {
//   transition: transform 0.5s ease;
// }

// .icon-fade-enter,
// .icon-fade-leave-to {
//   transform: scale(0.5);
// }
</style>
