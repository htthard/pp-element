<template>
  <div
    class="pp-switch"
    :class="{
      [`pp-switch--${size}`]: props.size,
      'is-checked': checked,
      'is-disabled': disabled,
    }"
    @click="switchValue"
  >
    <input
      ref="input"
      class="pp-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="pp-switch__core">
      <div class="pp-switch__core-inner">
        <span v-if="activeText || inactiveText" class="pp-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="pp-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'
defineOptions({
  name: 'PpSwitch',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
})
console.log(props)
const emit = defineEmits<SwitchEmits>()

const innerValue = ref(props.modelValue)
const input = ref<HTMLInputElement>()
watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val
  },
)

const checked = computed(() => innerValue.value === props.activeValue)
onMounted(() => {
  input.value!.checked = checked.value
})
watch(checked, (val) => {
  input.value!.checked = val
})
const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>
