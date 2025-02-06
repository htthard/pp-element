import { isRef, onBeforeUnmount, onMounted, unref, watch, type Ref } from 'vue'

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (event: Event) => any,
) {
  if (isRef(target)) {
    watch(target, (newVal, oldVal) => {
      oldVal?.removeEventListener(event, handler)
      newVal?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onBeforeUnmount(() => {
    unref(target)!.removeEventListener(event, handler)
  })
}
