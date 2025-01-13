<template>
  <div class="pp-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      class="pp-collapse-item__header"
      :class="{ 'is-disabled': disabled, 'is-active': isShow }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="pp-collapse-item__wrapper" v-show="isShow">
        <div class="pp-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue'
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
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = '0px'
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>

<style></style>
