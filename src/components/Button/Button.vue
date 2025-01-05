<template>
  <button
    ref="_ref"
    class="pp-button"
    :class="{
      [`pp-button-${type}`]: type,
      [`pp-button-${size}`]: size,
      'is-plain': plain,
      'is-disabled': disabled,
      'is-round': round,
      'is-circle': circle,
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonProps } from './types'

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

const _ref = ref(null)
defineExpose({ ref: _ref })
</script>
<style scoped></style>
