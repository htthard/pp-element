---
title: Button 按钮
description: Button 按钮是一个常用的操作组件
---

# Button 按钮

常用的操作按钮组件。

## 基础用法

基础的按钮用法。

<script setup>
import Button from '../../src/components/Button/Button.vue'
</script>

<div class="example-showcase">
  <Button>默认按钮</Button>
  <Button type="primary">主要按钮</Button>
  <Button type="success">成功按钮</Button>
  <Button type="info">信息按钮</Button>
  <Button type="warning">警告按钮</Button>
  <Button type="danger">危险按钮</Button>
</div>

```vue
<Button>默认按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="info">信息按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
```

## 禁用状态

按钮不可用状态。

<div class="example-showcase">
  <Button disabled>禁用按钮</Button>
  <Button type="primary" disabled>禁用主要按钮</Button>
</div>

```vue
<Button disabled>禁用按钮</Button>
<Button type="primary" disabled>禁用主要按钮</Button>
```

## 图标按钮

带图标的按钮可增强辨识度。

<div class="example-showcase">
  <Button icon="edit">编辑</Button>
  <Button icon="share">分享</Button>
  <Button icon="delete">删除</Button>
  <Button icon="search" circle></Button>
</div>

```vue
<Button icon="edit">编辑</Button>
<Button icon="share">分享</Button>
<Button icon="delete">删除</Button>
<Button icon="search" circle></Button>
```

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

<div class="example-showcase">
  <Button loading>加载中</Button>
  <Button type="primary" loading>加载中</Button>
</div>

```vue
<Button loading>加载中</Button>
<Button type="primary" loading>加载中</Button>
```

## 按钮尺寸

提供三种不同尺寸的按钮。

<div class="example-showcase">
  <Button size="small">小型按钮</Button>
  <Button>默认按钮</Button>
  <Button size="large">大型按钮</Button>
</div>

```vue
<Button size="small">小型按钮</Button>
<Button>默认按钮</Button>
<Button size="large">大型按钮</Button>
```

## API

### 属性

| 属性名     | 说明           | 类型    | 可选值                                      | 默认值 |
| ---------- | -------------- | ------- | ------------------------------------------- | ------ |
| type       | 按钮类型       | string  | primary / success / warning / danger / info | —      |
| size       | 尺寸           | string  | large / small                               | —      |
| plain      | 是否朴素按钮   | boolean | —                                           | false  |
| round      | 是否圆角按钮   | boolean | —                                           | false  |
| circle     | 是否圆形按钮   | boolean | —                                           | false  |
| loading    | 是否加载中状态 | boolean | —                                           | false  |
| disabled   | 是否禁用状态   | boolean | —                                           | false  |
| icon       | 图标类名       | string  | —                                           | —      |
| autofocus  | 是否默认聚焦   | boolean | —                                           | false  |
| nativeType | 原生 type 属性 | string  | button / submit / reset                     | button |

### 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |

### 事件

| 事件名 | 说明           | 参数                |
| ------ | -------------- | ------------------- |
| click  | 点击按钮时触发 | (event: MouseEvent) |

<style>
.example-showcase {
  display: flex;
  gap: 12px;
  margin: 16px 0;
}
.example-showcase .pp-button {
  margin: 0;
}
</style>
