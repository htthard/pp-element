<template>
  <section class="pp-tooltip" ref="tooltipRef" v-on="outerEvents">
    <div class="pp-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isOpen" class="pp-tooltip__popper" ref="overlayNode">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </section>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, reactive, ref, watch } from 'vue'
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types'
import { createPopper, type Instance } from '@popperjs/core'
import useClickOutside from '../../hooks/useClickOutside.ts'
import { debounce } from 'lodash-es'
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  transition: 'fade',
  openDelay: 500,
  closeDelay: 500,
})
const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}))

const emits = defineEmits<TooltipEmits>()

const triggerNode = ref<HTMLElement>()
const overlayNode = ref<HTMLElement>()

const isOpen = ref(false)
const toggleOpen = () => {
  if (isOpen.value) {
    finalClose()
  } else {
    finalOpen()
  }
}
const open = () => {
  console.log('open')

  isOpen.value = true
  emits('visible-change', true)
}
const close = () => {
  console.log('close')

  isOpen.value = false
  emits('visible-change', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const finalOpen = () => {
  closeDebounce.cancel()
  openDebounce()
}
const finalClose = () => {
  openDebounce.cancel()
  closeDebounce()
}

let events = reactive<Record<string, any>>({})
let outerEvents = reactive<Record<string, any>>({})
const attchEvents = () => {
  if (props.trigger === 'click') {
    events['click'] = toggleOpen
  } else if (props.trigger === 'hover') {
    events['mouseenter'] = finalOpen
    outerEvents['mouseleave'] = finalClose
  }
}
if (!props.manual) {
  attchEvents()
}
watch(
  () => props.trigger,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      events = {}
      outerEvents = {}
      attchEvents()
    }
  },
)

let popperInstance: Instance | null = null
watch(
  isOpen,
  (val) => {
    if (val) {
      if (triggerNode.value && overlayNode.value) {
        popperInstance = createPopper(triggerNode.value, overlayNode.value, popperOptions.value)
      } else {
        popperInstance?.destroy()
      }
    }
  },
  { flush: 'post' },
)

const tooltipRef = ref<HTMLElement>()
useClickOutside(tooltipRef, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    finalClose()
  }
  if (isOpen.value) {
    emits('click-outside', true)
  }
})

onUnmounted(() => {
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  show: finalOpen,
  hide: finalClose,
})
</script>

<style>
.pp-tooltip {
  display: inline-flex;
}
</style>
