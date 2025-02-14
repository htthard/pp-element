<template>
  <div
    class="pp-select"
    :class="{
      'is-disabled': disabled
    }"
    @click="toggleDropdown"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      manual
      :close-delay="0"
      :open-delay="0"
    >
      <Input
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
      />
      <template #content>
        <ul class="pp-select__menu">
          <template v-for="(item, index) of options" :key="index">
            <li
              class="pp-select__menu-item"
              :class="{ 'is-disabled': item.disabled, 'is-selected': item.value === states.selectedOption?.value }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              {{ item.label }}
              <span v-if="item.value === states.selectedOption?.value">selected</span>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Input from '../Input/Input.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { SelectEmits, SelectOption, SelectProps, SelectStates } from './types';
import type { TooltipInstance } from '../Tooltip/types';

const findOption = (value: string) => {
  return props.options.find(item => item.value === value) || null
}
defineOptions({ name: 'PPSelect' })
const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const innerValue = ref(initialOption ? initialOption.label : '')
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption
})
const tooltipRef = ref<TooltipInstance>()
const isDropdownValue = ref(false)
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
}
 


</script>