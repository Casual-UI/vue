---
title: 工具提示
componentPath: popup/CTooltip
---

### 使用

```vue live
<template>
  <c-tooltip content="一些tooltip信息">
    <c-button label="Hover Me" />
  </c-tooltip>
</template>
```

### 位置

```vue live
<script setup>
import { ref } from 'vue'
const pos = ref('top-start')
const positions = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
  'left-start',
  'left',
  'left-end',
].map(p => ({
  label: p,
  value: p
}))
</script>

<template>
  <c-radio-group
    :options="positions"
    v-model="pos"
  />
  <div text-center py-8>
    <c-tooltip :position="pos" :content="`我是一个来自于 ${pos} 位置的提示`">
      <c-button label="Hover me" />
    </c-tooltip>
  </div>
</template>
```


### 自定义内容

```vue live
<template>
  <c-tooltip
    position="right"
    trigger="click"
  >
    <c-button label="点我" />
    <template #popup>
      <div class="custom-content">
        哇，可以使用任何元素作为自定义内容哦
        <c-button
          rounded
          outlined
          label="自定义按钮"
        />
      </div>
    </template>
  </c-tooltip>
</template>

<style scoped>
.custom-content {
  white-space: nowrap;
  background: #333;
  padding: 12px;
  color: #fff;
}
</style>
```

### 触发方式

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)

const toggleShow = () => {
  show.value = !show.value
}
</script>

<template>
  <div class="popups">
    <c-tooltip content="你好，世界">
      <c-button
        outlined
        rounded
        label="悬浮（默认）"
      />
    </c-tooltip>
    <c-tooltip
      trigger="click"
      content="你好，世界"
    >
      <c-button
        rounded
        label="点击"
      />
    </c-tooltip>
    <div>
      <c-button
        label="手动"
        @click="toggleShow"
      />
      <c-tooltip
        v-model:show="show"
        trigger="manual"
        content="你好，世界"
      >
        点击左侧按钮手动触发
      </c-tooltip>
    </div>
  </div>
</template>

<style scoped>
.popups {
  display: flex;
}
div + div {
  margin-left: 12px;
}
</style>
```
