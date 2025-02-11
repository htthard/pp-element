export type SwitchValueType = boolean | string | number

export interface SwitchProps {
  modelValue: SwitchValueType
  disabled?: boolean
  size?: 'small' | 'large'
  activeValue?: SwitchValueType
  inactiveValue?: SwitchValueType
  activeText?: string
  inactiveText?: string
  name?: string
  id?: string
}

export interface SwitchEmits {
  (e: 'update:modelValue', value: SwitchValueType): void
  (e: 'change', value: SwitchValueType): void
}
