<template>
  <transition name="fade">
    <div
      v-show="visible"
      class="pp-alert"
      :class="{
        [`pp-alert--${type}`]: type,
        [`pp-alert__${effect}`]: effect,
      }"
    >
      <div class="pp-alert__content">
        <span class="pp-alert__title">
          {{ title }}
        </span>
        <span class="pp-alert__close-btn" v-if="closable">
          <Icon icon="xmark" @click="hideAlert" />
        </span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { AlertProps, AlertEmits } from './types'

defineOptions({
  name: 'PpAlert',
})

withDefaults(defineProps<AlertProps>(), {
  type: 'primary',
  effect: 'light',
  closable: true,
})

const emit = defineEmits<AlertEmits>()

const visible = ref(true)
const hideAlert = () => {
  visible.value = false
  emit('close')
}
</script>

<style></style>
