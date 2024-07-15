<script setup>
import { ref } from 'vue'
const topContainer = ref(null)
</script>
<style lang="scss">
.top-container {
  position: fixed;
  width: 100%;
}
</style>
<template>
  <div class="top-container" ref="topContainer">
    <slot name="top" />
  </div>
</template>
