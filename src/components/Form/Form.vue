<template>
  <form class="pp-form">
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import type { FormProps } from './types'

defineOptions({ name: 'PpForm' })
defineProps<FormProps>()
</script>
