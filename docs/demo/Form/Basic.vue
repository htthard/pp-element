<script setup>
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import Input from '@/components/Input/Input.vue'
import Button from '@/components/Button/Button.vue'
import { reactive, ref } from 'vue'

const formData = reactive({
  email: '1',
  password: '1',
  confirmPwd: '',
})
const rules = {
  email: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur' }],
  confirmPwd: [{ required: true, trigger: 'blur' }, {
    validator: (rule, value) => value === formData.password, trigger: 'blur', message: '两次密码必须一致'
  }],
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
      <Input type="password" v-model="formData.password" />
    </FormItem>
    <FormItem label="the confirm pwd" prop="confirmPwd">
      <Input type="password" v-model="formData.confirmPwd" />
    </FormItem>
    <div>
      <Button type="primary" @click.prevent="validate">Submit</Button>
      <button @click.prevent="reset">Reset</button>
    </div>
  </Form>
  form data
  {{ formData }}
</template>
