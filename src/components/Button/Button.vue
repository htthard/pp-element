<template>
  <button
    ref="_ref"
    class="pp-button"
    :class="{
      [`pp-button--${type}`]: type,
      [`pp-button--${size}`]: size,
      'is-plain': plain,
      'is-disabled': disabled,
      'is-round': round,
      'is-circle': circle,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'

withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

const _ref = ref(null)
defineExpose({ ref: _ref })
</script>
<style></style>
