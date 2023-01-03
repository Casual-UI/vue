---
title: Ajax Bar
componentPath: interact/CAjaxBar
---

### 基础使用

```vue live
<script setup>
import { ref } from 'vue'
const ajaxBar = ref()

const start = () => {
  ajaxBar.value && ajaxBar.value.start()
}

const end = () => {
  ajaxBar.value && ajaxBar.value.end()
}
</script>

<template>
  <c-ajax-bar ref="ajaxBar" />
  <c-button label="打开" @click="start" />
  <c-button label="结束" theme="negative" rounded @click="end" />
</template>
```

### Themes

```vue live
<script setup>
import { ref } from 'vue'
const ajaxBar = ref()
const theme = ref('primary')

const startWithTheme = (t) => {
  theme.value = t
  ajaxBar.value && ajaxBar.value.start()
}

const end = () => {
  ajaxBar.value && ajaxBar.value.end()
}
</script>

<template>
  <c-ajax-bar ref="ajaxBar" :theme="theme" />
  <c-button label="打开主色" @click="startWithTheme('primary')" />
  <c-button label="打开辅色" theme="secondary" @click="startWithTheme('secondary')" />
  <c-button label="打开警告色" theme="warning" @click="startWithTheme('warning')" />
  <c-button label="打开消极色" theme="negative" @click="startWithTheme('negative')" />
  <c-button label="结束" theme="negative" rounded @click="end" />
</template>
```