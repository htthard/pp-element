<template>
  <div
    class="pp-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
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
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownValue"
        @input="debounceOnFilter"
        @keydown="handleKeyDown"
      >
        <template #suffix>
          <Icon
            v-if="clearIconShow"
            @click.stop="onClear"
            @mousedown.prevent=""
            icon="circle-xmark"
            class="pp-input__clear"
          ></Icon>
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownValue }"
          ></Icon>
        </template>
      </Input>
      <template #content>
        <div class="pp-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin></Icon>
        </div>
        <div class="pp-select__nodata" v-else-if="filterable && filterOptions.length === 0">
          no matched data
        </div>
        <ul class="pp-select__menu" v-else>
          <template v-for="(item, index) of filterOptions" :key="index">
            <li
              class="pp-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': item.value === states.selectedOption?.value,
                'is-highlight': index === states.highlightIndex,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVNode :vNode="renderLabel ? renderLabel(item) : item.label"></RenderVNode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import Input from '../Input/Input.vue'
import Icon from '../Icon/Icon.vue'
import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVNode from '../Common/RenderVNode'
import type { SelectEmits, SelectOption, SelectProps, SelectStates, SelectValue } from './types'
import type { TooltipInstance } from '../Tooltip/types'
import type { InputInstance } from '../Input/types'
import { debounce, filter, isFunction } from 'lodash-es'

const findOption = (value: SelectValue) => {
  return props.options.find((item) => item.value === value) || null
}
defineOptions({ name: 'PPSelect' })
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
})
const timeout = computed(() => (props.remote ? 300 : 0))
const emits = defineEmits<SelectEmits>()
const initialOption = findOption(props.modelValue)
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
})
watch(
  () => props.modelValue,
  (newValue) => {
    states.inputValue = findOption(newValue)?.label || ''
  },
)
const clearIconShow = computed(() => {
  return (
    props.clearable && states.mouseHover && states.selectedOption && states.inputValue.trim() !== ''
  )
})
const onClear = () => {
  states.inputValue = ''
  states.selectedOption = null
  emits('clear')
  emits('change', '')
  emits('update:modelValue', '')
}
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

const filterOptions = ref(props.options)
watch(
  () => props.options,
  (newVal) => {
    filterOptions.value = newVal
  },
)
const generateFilterOptions = async (e: string) => {
  if (!props.filterable) return
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filterOptions.value = props.filterMethod(e)
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    states.loading = true
    try {
      filterOptions.value = await props.remoteMethod(e)
    } catch (error) {
      filterOptions.value = []
      console.error(error)
    } finally {
      states.loading = false
    }
  } else {
    filterOptions.value = props.options.filter((item) => item.label.includes(e))
  }
  states.highlightIndex = -1
}
const onFilter = () => {
  generateFilterOptions(states.inputValue)
}
const debounceOnFilter = debounce(() => {
  onFilter()
}, timeout.value)
const filteredPlaceholder = computed(() => {
  if (props.filterable && states.selectedOption && isDropdownValue.value) {
    return states.selectedOption.label
  }
  return props.placeholder
})
const controlDropdown = (show: boolean) => {
  if (show) {
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''
      generateFilterOptions('')
    }
    tooltipRef.value?.show()
  } else {
    tooltipRef.value?.hide()
    if (props.filterable) {
      states.inputValue = states.selectedOption ? states.selectedOption.label : ''
    }
    states.highlightIndex = -1
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

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownValue.value) {
        controlDropdown(true)
      } else {
        if (states.highlightIndex > -1 && filterOptions.value[states.highlightIndex]) {
          itemSelect(filterOptions.value[states.highlightIndex])
        } else {
          controlDropdown(false)
        }
      }
      break
    case 'Escape':
      if (isDropdownValue.value) {
        controlDropdown(false)
      }
      break
    case 'ArrowUp':
      e.preventDefault()
      if (filterOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filterOptions.value.length - 1
        } else {
          states.highlightIndex--
        }
      }
      break
    case 'ArrowDown':
      e.preventDefault()
      if (filterOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filterOptions.value.length - 1
        ) {
          states.highlightIndex = 0
        } else {
          states.highlightIndex++
        }
      }
      break
    default:
      break
  }
}
</script>
