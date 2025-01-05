<script setup lang="ts">
defineOptions({
  name: 'PpButton',
})

import Button from '@/components/Button/Button.vue'
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types'

const btnRef = ref<ButtonInstance | null>(null)

onMounted(() => {
  if (btnRef.value) {
    console.log(btnRef.value.ref)
  }
})
</script>
<template>
  <section>
    <Button ref="btnRef" type="primary" size="large" plain disabled>Test Button</Button>
  </section>
</template>

<style></style>
