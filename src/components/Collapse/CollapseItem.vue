<template>
  <div class="pp-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="pp-collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="pp-collapse-item__content" :id="`item-content-${name}`" v-show="isShow">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { CollapseContextKey, type CollapseItemProps } from './types'

defineOptions({
  name: 'PpCollapseItem',
})

const props = defineProps<CollapseItemProps>()

const collapseContext = inject(CollapseContextKey)
const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}

const isShow = computed(() => collapseContext?.activeNames.value.includes(props.name))
</script>

<style>
.pp-collapse-item__header {
  font-size: 30px;
}
</style>
