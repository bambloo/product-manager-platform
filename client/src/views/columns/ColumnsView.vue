<script setup lang="ts">
import { ref } from 'vue'
import VaButton from '../../vuestic-ui/components/va-button/VaButton.vue'
import VaCardContent from '../../vuestic-ui/components/va-card/components/va-card-content/VaCardContent.vue'
import VaCard from '../../vuestic-ui/components/va-card/VaCard.vue'
import ColumnsCards from './ColumnsCards.vue'

const active = ref(false)
</script>
<template>
  <VaCard>
    <VaCardContent>
      <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
        <VaButton icon="add" @click="createNewProject">{{ $t('menu.admin.column') }}</VaButton>
      </div>
      <ColumnsCards />
    </VaCardContent>
  </VaCard>
</template>
