<script setup lang="ts">
defineOptions({
  name: 'PpButton',
})
import type { Options } from '@popperjs/core'
import Tooltip from './components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'
import Collapse from '@/components/Collapse/Collapse.vue'
import Icon from '@/components/Icon/Icon.vue'
import Item from '@/components/Collapse/CollapseItem.vue'
import Alert from '@/components/Alert/Alert.vue'
import { onMounted, reactive, ref } from 'vue'
import type { ButtonInstance } from '@/components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'

const btnRef = ref<ButtonInstance | null>(null)
const triggerEvent = ref<any>('click')
const TooltipRef = ref<TooltipInstance>()
const tooltipOptions = reactive<Partial<Options>>({
  placement: 'right-end',
  strategy: 'fixed',
})
const openTooltip = () => {
  TooltipRef.value?.show()
}
const closeTooltip = () => {
  TooltipRef.value?.hide()
}

onMounted(() => {
  if (btnRef.value) {
    // console.log(btnRef.value.ref)
  }
})
const openValues = ref(['a'])

const handelClick = () => {
  // console.log('click')
}

const handleAlertClose = () => {
  console.log('close')
}
</script>
<template>
  <header>
    <Tooltip content="content tt" :trigger="triggerEvent" placement="right" ref="TooltipRef">
      <img src="./assets/logo.svg" alt="logo" width="125" height="125" />
      <template #content> content 1212 </template>
    </Tooltip>
  </header>
  <section>
    <Button @click="openTooltip" ref="btnRef" type="primary" size="large" plain>Test Button</Button>
    <Button @click="closeTooltip" plain>Plain Button</Button>
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
    <Button size="large" loading>loading</Button>
    <Button size="small" icon="arrow-up">Small</Button><br /><br />

    <Collapse v-model="openValues" accordion>
      <Item name="a">
        <template #title>
          <div>custom Title</div>
        </template>
        <div>content content content</div>
      </Item>
      <Item name="b" title="title11">
        <div>content111 content content</div>
      </Item>
      <Item name="c" title="title22" disabled>
        <div>content111222 content content</div>
      </Item>
    </Collapse>

    <Icon icon="fa-solid fa-i-cursor fa-fade" type="danger" color="blue"></Icon>

    <Alert title="alert title" @close="handleAlertClose"></Alert>
  </section>
</template>

<style></style>
