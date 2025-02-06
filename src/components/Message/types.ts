import type { offset } from "@popperjs/core";
import type { ComponentInternalInstance, VNode } from "vue";

export interface MessageProps {
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'warning' | 'info' | 'error'
  onDestroy: () => void
  offset?: number
  id: string
}

export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: MessageProps
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id'>