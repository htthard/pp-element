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
    >
      <Input
        v-model="innerValue"
        :disabled="disabled"
        :placeholder="placeholder"
      />
      <template #content>
        <ul class="pp-select__menu">
          <template v-for="(item, index) of options" :key="index">
            <li
              class="pp-select__menu-item"
              :class="{ 'is-disabled': item.disabled }"
              :id="`select-item-${item.value}`"
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
import { ref } from 'vue';
import Input from '../Input/Input.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { SelectEmits, SelectProps } from './types';
import type { TooltipInstance } from '../Tooltip/types';


defineOptions({ name: 'PPSelect' })

const props = defineProps<SelectProps>()
const emits = defineEmits<SelectEmits>()

const innerValue = ref('')

const tooltipRef = ref<TooltipInstance>()
const isDropdownValue = ref(false)
const controlDropdown = (show: boolean) => {
  if(show) {
    tooltipRef.value?.show()
  } else {
    tooltipRef.value?.hide()
  }
  isDropdownValue.value = show
  emits('visible-change', show)
}
const toggleDropdown = () => {
  if(props.disabled) return
  if(isDropdownValue.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}
</script>