<template>
  <Transition :name="transitionName" @afterLeave="destroyComponent" @enter="updateHeight">
    <div
      v-show="visible"
      :class="{
        [`pp-message--${type}`]: type,
        'is-close': showClose,
      }"
      class="pp-message"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTime"
      @mouseleave="startTime"
    >
      <div class="pp-message__content">
        <slot>
          <RenderVNode :vNode="message" v-if="message"></RenderVNode>
        </slot>
      </div>
      <div class="pp-message__close" v-if="showClose">
        <Icon icon="xmark" @click.stop="visible = false"></Icon>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import RenderVNode from '../Common/RenderVNode'
import type { MessageProps } from './types'
import Icon from '../Icon/Icon.vue'
import { getLastBottomOffset } from './method'
import useEventListener from '@/hooks/useEventListener'
defineOptions({
  name: 'PpMessage',
})

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000,
  type: 'info',
  offset: 20,
  transitionName: 'fade-up',
  showClose: true,
})

let visible = ref(false)
const messageRef = ref<HTMLElement>()
// 计算高度
const height = ref(0)
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + lastOffset.value)
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: `${topOffset.value}px`,
  zIndex: props.zIndex,
}))

let timer: any
const startTime = () => {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
const clearTime = () => {
  clearTimeout(timer)
}

function keydown(e: Event) {
  const event = e as KeyboardEvent
  // 判断是否esc
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)

onMounted(async () => {
  visible.value = true
  startTime()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})

// watch(visible, (newValue) => {
//   if (!newValue) {
//     props.onDestroy()
//   }
// })
function destroyComponent() {
  props.onDestroy()
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineExpose({ bottomOffset, visible })
</script>

<style>
.pp-message {
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  border: 1px solid #ccc;
  width: max-content;
}
</style>
