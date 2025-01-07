<script setup lang="ts">
defineOptions({
  name: 'PpButton',
})

import Button from '@/components/Button/Button.vue'
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types'

const btnRef = ref<ButtonInstance | null>(null)

onMounted(() => {
  if (btnRef.value) {
    console.log(btnRef.value.ref)
  }
})

const handelClick = () => {
  console.log('click')
}
</script>
<template>
  <section>
    <Button ref="btnRef" type="primary" size="large" plain disabled>Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>round-button</Button>
    <Button disabled>Disabled Button</Button><br /><br />
    <Button type="primary" @click="handelClick">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button><br /><br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button><br /><br />
    <Button size="large">Large</Button>
    <Button size="small">Small</Button><br /><br />
  </section>
</template>

<style></style>
