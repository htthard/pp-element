<template>
  <form class="pp-form">
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import { formContextKey, type FormProps } from './types'

defineOptions({ name: 'PpForm' })
const props = defineProps<FormProps>()
provide(formContextKey, props)
</script>
