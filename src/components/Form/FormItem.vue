<template>
  <div class="pp-form-item">
    <label class="pp-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="pp-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormItemProps } from './types'
defineOptions({ name: 'PpFormItem' })
defineProps<FormItemProps>()
</script>
