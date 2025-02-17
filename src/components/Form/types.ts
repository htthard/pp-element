import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import type { InjectionKey } from 'vue'

export interface FormItemProps {
  label: string
  prop?: string
}

interface FormItemRule extends RuleItem {
  trigger?: string
}

export type FormRules = Record<string, FormItemRule[]>

export interface FormProps {
  model: Record<string, any>
  rules: FormRules
}

export interface FormContext extends FormProps {}
export interface FormItemContext {
  validate: (trigger?: string) => any
}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey')
