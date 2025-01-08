import type { InjectionKey, Ref } from 'vue'

export type NameType = string | number

export interface CollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

interface CollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export interface CollapseProps {
  accordion?: boolean
}
export interface CollapseEmits {
  (e: 'change', values: NameType[]): void
}

export const CollapseContextKey: InjectionKey<CollapseContext> = Symbol('CollapseContextKey')
