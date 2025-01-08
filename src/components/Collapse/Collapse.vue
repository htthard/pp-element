<template>
  <div class="pp-collapse">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { CollapseContextKey, type CollapseEmits, type CollapseProps, type NameType } from './types'

defineOptions({
  name: 'PpCollapse',
})

const activeNames = defineModel<NameType[]>({ required: true, default: () => [] })
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
if (props.accordion && activeNames.value.length > 1) {
  console.log('accordion mode should be only one item')
}
const handleItemClick = (name: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === name ? '' : name]
  } else {
    const index = activeNames.value.indexOf(name)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(name)
    }
  }
  emits('change', activeNames.value)
}

provide(CollapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>
