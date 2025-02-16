<template>
  <div
    class="pp-form-item"
    :class="{
      'is-loading': validateStates.loading,
      'is-success': validateStates.state === 'success',
      'is-error': validateStates.state === 'error',
      'is-required': isRequired
    }"
  >
    <label class="pp-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="pp-form-item__content">
      <slot :validate="validate"></slot>
      <div class="pp-form-item__error-msg" v-if="validateStates.state === 'error'">
        {{ validateStates.errorMsg }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue'
import {
  formContextKey,
  formItemContextKey,
  type FormItemContext,
  type FormItemInstance,
  type FormItemProps,
  type FormValidateFailure,
  type ValidateStatesProps,
} from './types'
import { isNil } from 'lodash-es'
import Schema from 'async-validator'
defineOptions({ name: 'PpFormItem' })
const props = defineProps<FormItemProps>()

let initValue: any = null
const formContext = inject(formContextKey)
const innerValue = computed(() => {
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop]
  } else {
    return null
  }
})
const itemRules = computed(() => {
  const rules = formContext?.rules
  if (rules && props.prop && !isNil(rules[props.prop])) {
    return rules[props.prop]
  } else {
    return []
  }
})
const isRequired = computed(() => {
  return itemRules.value.some(rule => rule.required)
})

const validateStates: ValidateStatesProps = reactive({
  state: 'init',
  errorMsg: '',
  loading: false,
})

const getTriggerRules = (trigger?: string) => {
  const rules = itemRules.value
  if (rules && rules.length > 0) {
    return rules.filter(rule => {
      if (!rule.trigger || !trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  } else {
    return []
  }
}

const validate = async (trigger?: string) => {
  const propName = props.prop
  const triggerRules = getTriggerRules(trigger)
  if (triggerRules.length === 0) return true
  if (propName) {
    const validator = new Schema({
      [propName]: triggerRules,
    })
    validateStates.loading = true
    return validator
      .validate({ [propName]: innerValue.value })
      .then(() => {
        validateStates.state = 'success'
      })
      .catch((err: FormValidateFailure) => {
        const { errors } = err
        validateStates.state = 'error'
        validateStates.errorMsg = errors && errors.length > 0 ? errors[0].message || '' : ''
        return Promise.reject(err)
      })
      .finally(() => {
        validateStates.loading = false
      })
  }
}

const clearValidate = () => {
  validateStates.state = 'init'
  validateStates.loading = false
  validateStates.errorMsg = ''
}

const resetField = () => {
  clearValidate()
  const model = formContext?.model
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initValue
  }
}

const context: FormItemContext = {
  prop: props.prop || '',
  validate,
  resetField,
  clearValidate
}

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    initValue = innerValue.value
  }
})
onUnmounted(() => {
  formContext?.removeField(context)
})

defineExpose<FormItemInstance>({
  validateStates,
  validate,
  resetField,
  clearValidate
})
</script>
