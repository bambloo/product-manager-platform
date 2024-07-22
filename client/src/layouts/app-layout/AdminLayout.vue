<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { validate_token } from '../../scripts/token'

const isReady = ref(false)

onMounted(() => {
  return validate_token()
    .then(() => {
      isReady.value = true
    })
    .catch(() => {
      useRouter().replace({ name: 'login' })
    })
})
</script>

<template>
  <div v-if="isReady">Admin</div>
</template>
