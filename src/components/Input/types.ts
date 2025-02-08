export interface InputProps {
  type?: string
  size?: string
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  modelValue: string
  placeholder?: string
  readonly?: boolean
  autocomplete?: string
  autofocus?: boolean
  form?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
