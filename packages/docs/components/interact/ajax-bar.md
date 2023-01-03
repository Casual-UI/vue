---
title: Ajax Bar
componentPath: interact/CAjaxBar
---

### Basic

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
  <c-button label="Start" @click="start" />
  <c-button label="End" theme="negative" rounded @click="end" />
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
  <c-button label="Start primary" @click="startWithTheme('primary')" />
  <c-button label="Start secondary" theme="secondary" @click="startWithTheme('secondary')" />
  <c-button label="Start warning" theme="warning" @click="startWithTheme('warning')" />
  <c-button label="Start negative" theme="negative" @click="startWithTheme('negative')" />
  <c-button label="End" theme="negative" rounded @click="end" />
</template>
```