<template>
  <div
    class="pp-input"
    :class="{
      [`pp-input--${size}`]: size,
      [`pp-input--${type}`]: type,
      'is-disabled': disabled,
      'is-prefix': slots.prefix,
      'is-suffix': slots.suffix,
      'is-prepend': slots.prepend,
      'is-append': slots.append,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="slots.prepend" class="pp-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="pp-input__wrapper">
        <!-- prefix slot -->
        <span v-if="slots.prefix" class="pp-input__prefix">
          <slot name="prefix" />
        </span>
        <!-- input -->
        <input
          ref="inputRef"
          v-bind="attrs"
          v-model="innerValue"
          class="pp-input__inner"
          :type="showPassword ? (pwdVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          @input="handleUpdate"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          :placeholder="placeholder"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :form="form"
        />
        <!-- suffix slot -->
        <span
          v-if="slots.suffix || showClear || showPasswordArea"
          class="pp-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="pp-input__clear"
            @click.native="clear"
            @mousedown.prevent=""
          />
          <Icon
            v-if="showPasswordArea && pwdVisible"
            icon="eye"
            class="pp-input__password"
            @click="togglePwdVisible"
          />
          <Icon
            v-if="showPasswordArea && !pwdVisible"
            icon="eye-slash"
            class="pp-input__password"
            @click.native="togglePwdVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="slots.append" class="pp-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="inputRef"
        v-bind="attrs"
        v-model="innerValue"
        class="pp-textarea__wrapper"
        :disabled="disabled"
        @input="handleUpdate"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :placeholder="placeholder"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :form="form"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useSlots, watch } from 'vue'
import type { InputProps, InputEmits } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'Input',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  readonly: false,
  autocomplete: 'off',
  autofocus: false,
  form: '',
})

const emit = defineEmits<InputEmits>()
const attrs = useAttrs()
const slots = useSlots()
const innerValue = ref(props.modelValue)
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue
  },
)

const handleUpdate = (e: Event) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', target.value)
}
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement
  emit('change', target.value)
}

const isFocus = ref(false)
const showClear = computed(
  () => props.clearable && !props.disabled && !!innerValue.value && isFocus.value,
)
const showPasswordArea = computed(() => props.showPassword && !props.disabled && !!innerValue.value)
const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emit('focus', e)
}
const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emit('blur', e)
}
const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
  emit('input', '')
  emit('change', '')
}

const pwdVisible = ref(false)
const togglePwdVisible = () => {
  pwdVisible.value = !pwdVisible.value
}

const keepFocus = async () => {
  await nextTick()
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

const inputRef = ref<HTMLInputElement | null>(null)
defineExpose({
  ref: inputRef,
})
</script>
