<script setup>
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
import { reactive } from 'vue'

const formData = reactive({
  email: '',
  password: '',
})
const rules = {
  email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
</script>

<template>
  <Form :model="formData" :rules="rules">
    <FormItem label="the email">
      <Input v-model="formData.email" />
    </FormItem>
    <FormItem label="the password">
      <template #label="{ label }">
        <Button>{{ label }}</Button>
      </template>

      <Input type="password" v-model="formData.password" />
    </FormItem>
    <div>
      <Button type="primary">Submit</Button>
      <button>Reset</button>
    </div>
  </Form>
  form data
  {{ formData }}
</template>
