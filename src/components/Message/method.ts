import { h, render, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import Message from './Message.vue'
import useZIndex from '@/hooks/useZIndex'

let seed = 1
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message-${seed++}`
  const container = document.createElement('div')
  const onDestroy = () => {
    const index = instances.findIndex((instance) => instance.id === id)
    if (index === -1) return
    instances.splice(index, 1)
    render(null, container)
  }

  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const newProps = {
    ...props,
    id,
    onDestroy,
    zIndex: nextZIndex(),
  }
  const vnode = h(Message, newProps)
  render(vnode, container)
  const instance: MessageContext = {
    id,
    vnode,
    vm: vnode.component!,
    props: newProps,
    destroy: manualDestroy,
  }
  instances.push(instance)

  document.body.appendChild(container.firstElementChild!)
  return instance
}

export const getLastMessage = () => {
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  console.log(id, instances.length)

  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) return 0

  const prev = instances[idx - 1]
  console.log(prev.vm.exposed!.bottomOffset.value, 'prev.vm.exposed!.bottomOffset.value')
  return prev.vm.exposed!.bottomOffset.value
}

export const closeAllInstances = () => {
  instances.forEach((instance) => {
    instance.destroy()
  })
}
