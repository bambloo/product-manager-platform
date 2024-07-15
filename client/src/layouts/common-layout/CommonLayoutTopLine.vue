<style lang="scss">
.common-layout-line {
  display: flex;
  width: 100%;
  padding: 0px calc((100% - var(--va-max-screen-width)) / 2);
}
</style>
<template>
  <div class="common-layout-line">
    <slot />
  </div>
</template>
