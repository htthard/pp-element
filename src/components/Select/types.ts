export type SelectValue = string | number
export interface SelectOption {
  label: string
  value: SelectValue
  disabled?: boolean
}

export interface SelectProps {
  modelValue: SelectValue
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

export interface SelectEmits {
  (e: 'update:modelValue', value: SelectValue): void
  (e: 'change', value: SelectValue): void
  (e: 'visible-change', value: boolean): void
}

export interface SelectStates {
  inputValue: string
  selectedOption: null | SelectOption
}
