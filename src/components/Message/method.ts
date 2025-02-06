import { h, render, reactive } from "vue";
import type { CreateMessageProps, MessageContext } from "./types";
import Message from "./Message.vue";

let seed = 1
const instances: MessageContext[] = []
export const createMessage = (props: CreateMessageProps) => {
  const id = `message-${seed++}`
  const container = document.createElement("div");
  const onDestroy = () => {
    const index = instances.findIndex(instance => instance.id === id)
    if (index === -1) return
    instances.splice(index, 1)
    render(null, container)
  }
  const newProps = {
    ...props,
    id,
    onDestroy
  }
  const vnode = h(Message, newProps)
  render(vnode, container)
  const instance = { id, vnode, vm: vnode.component!, props: newProps }
  instances.push(instance)

  document.body.appendChild(container.firstElementChild!)
}

export const getLastMessage = () => {
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  console.log(id, instances.length);
  
  const idx = instances.findIndex(instance => instance.id === id)
  if(idx <= 0) return 0
  
  const prev = instances[idx - 1]
  console.log(prev.vm.exposed!.bottomOffset.value, 'prev.vm.exposed!.bottomOffset.value');
  return prev.vm.exposed!.bottomOffset.value
}