<template>
  <form class="pp-form">
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import { provide } from 'vue'
import { formContextKey, type FormContext, type FormInstance, type FormItemContext, type FormProps, type FormValidateFailure } from './types'
import type { ValidateFieldsError } from 'async-validator';

defineOptions({ name: 'PpForm' })
const props = defineProps<FormProps>()

const fields: FormItemContext[] = []
const addField: FormContext['addField'] = (field: FormItemContext) => {
  fields.push(field)
}
const removeField: FormContext['removeField'] = (field: FormItemContext) => {
  if(field.prop) {
    fields.splice(fields.indexOf(field), 1)
  }
}

const clearValidates = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(filed => keys.includes(filed.prop)) : fields
  filterArr.forEach(field => {
    field.clearValidate()
  })
}
const resetFields = (keys: string[] = []) => {
  const filterArr = keys.length > 0 ? fields.filter(filed => keys.includes(filed.prop)) : fields
  filterArr.forEach(field => {
    field.resetField()
  })
}

const validate = async () => {
  let validationErrors: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (e) {
      const error = e as FormValidateFailure
      validationErrors = {
        ...validationErrors,
        ...error.fields
      }
    }
  }
  if (Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}

provide(formContextKey, {
  ...props,
  addField,
  removeField
})

defineExpose<FormInstance>({
  validate,
  clearValidates,
  resetFields
})
</script>
