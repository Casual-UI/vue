---
title: v-loading
---

### Usage

```vue live
<script setup>
import { ref } from 'vue'
const loading = ref(false)
</script>

<template>
  <c-toggle v-model="loading" label="Click to open/close Loading" />
  <div
    v-loading="loading"
    class="loading-container"
  />
</template>

<style scoped>
.loading-container {
  height: 30vh;
}
</style>
```

### Custom Styles

Use with `v-loading:[custom style object]` to customize loading style

```vue live
<script setup>
import { ref } from 'vue'
const loading = ref(false)
const loadingConf = {
  fontSize: '4rem',
  color: 'cyan',
  backgroundColor: 'rgba(0, 0, 0, .7)'
}
</script>

<template>
  <c-toggle v-model="loading" label="Click to open/close Loading" />
  <div
    v-loading:[loadingConf]="loading"
    class="loading-container"
  />
</template>

<style lang="scss" scoped>
.loading-container {
  height: 30vh;
}
</style>
```