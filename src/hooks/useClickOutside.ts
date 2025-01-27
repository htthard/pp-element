import { onMounted, onUnmounted, type Ref } from 'vue'

const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void,
) => {
  const handle = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handle)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handle)
  })
}

export default useClickOutside
