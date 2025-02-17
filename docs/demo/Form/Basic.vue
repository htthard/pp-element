<script setup>
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
import { reactive } from 'vue'

const formData = reactive({
  email: '',
  password: '',
  test: '',
})
const rules = {
  email: [{ required: true, type: 'email', trigger: 'blur' },{ required: true, type: 'string', trigger: 'input' }],
  password: [{ required: true, trigger: 'blur' }],
  test: [{ required: true, trigger: 'blur' }],
}
</script>

<template>
  <Form :model="formData" :rules="rules">
    <FormItem label="the email" prop="email">
      <Input v-model="formData.email" />
    </FormItem>
    <FormItem label="the password" prop="password">
      <template #label="{ label }">
        <Button>{{ label }}</Button>
      </template>

      <Input type="password" v-model="formData.password" />
    </FormItem>
    <FormItem label="the test" prop="test">
      <template #default="{ validate }">
        <input type="text" v-model="formData.test" @blur="validate"
      /></template>
    </FormItem>
    <div>
      <Button type="primary">Submit</Button>
      <button>Reset</button>
    </div>
  </Form>
  form data
  {{ formData }}
</template>
