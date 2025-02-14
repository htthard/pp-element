export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  modelValue: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

export interface SelectEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'visible-change', value: boolean): void
}