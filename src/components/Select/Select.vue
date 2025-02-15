<template>
  <div
    class="pp-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggleDropdown"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :popper-options="popperOptions"
      manual
      :close-delay="0"
      :open-delay="0"
      @click-outside="controlDropdown(false)"
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        readonly
      >
        <template #suffix>
          <Icon
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownValue }"
          ></Icon>
        </template>
      </Input>
      <template #content>
        <ul class="pp-select__menu">
          <template v-for="(item, index) of options" :key="index">
            <li
              class="pp-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': item.value === states.selectedOption?.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { SelectEmits, SelectOption, SelectProps, SelectStates, SelectValue } from './types'
import type { TooltipInstance } from '../Tooltip/types'
import type { InputInstance } from '../Input/types'

const findOption = (value: SelectValue) => {
  return props.options.find((item) => item.value === value) || null
}
defineOptions({ name: 'PPSelect' })
const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
})
const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<InputInstance>()
const isDropdownValue = ref(false)
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`
      },
      phase: 'beforeWrite',
      requires: ['computeStyles'],
    },
  ],
}
const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value?.show()
  } else {
    tooltipRef.value?.hide()
  }
  isDropdownValue.value = show
  emits('visible-change', show)
}
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownValue.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

const itemSelect = (e: SelectOption) => {
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  controlDropdown(false)
  emits('update:modelValue', e.value)
  emits('change', e.value)
  inputRef.value?.ref.focus()
}
</script>
