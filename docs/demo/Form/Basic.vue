<script setup>
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
import { reactive, ref } from 'vue'

const formData = reactive({
  email: '1',
  password: '1',
  test: '',
})
const rules = {
  email: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
  test: [{ required: true, trigger: 'blur' }],
}

const formRef = ref()
const validate = async () => {
  try {
    await formRef.value.validate()
  } catch (e) {
    console.log(e, 'e');
  }
}

const reset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <Form :model="formData" :rules="rules" ref="formRef">
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
      <Button type="primary" @click.prevent="validate">Submit</Button>
      <button @click.prevent="reset">Reset</button>
    </div>
  </Form>
  form data
  {{ formData }}
</template>
