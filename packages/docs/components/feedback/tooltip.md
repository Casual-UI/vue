---
title: Tooltip
componentPath: popup/CTooltip
---

### Usage

```vue live
<template>
  <c-tooltip content="Some tooltip message">
    <c-button label="Hover Me" />
  </c-tooltip>
</template>
```

### Positions

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
    <c-tooltip :position="pos" :content="`I'm tooltip content from ${pos}`">
      <c-button label="Hover me" />
    </c-tooltip>
  </div>
</template>
```

### Custom Content

```vue live
<template>
  <c-tooltip
    position="right"
    trigger="click"
  >
    <c-button label="Click Me" />
    <template #popup>
      <div class="custom-content">
        I'm a custom content.
        <c-button
          rounded
          flat
          label="Even with a button"
        />
      </div>
    </template>
  </c-tooltip>
</template>

<style scoped>
.custom-content {
  white-space: nowrap;
  padding: 12px;
}
</style>
```

### Trigger Methods

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
    <c-tooltip content="Hello, world">
      <c-button
        outlined
        rounded
        label="Hover (default)"
      />
    </c-tooltip>
    <c-tooltip
      trigger="click"
      content="Hello, world"
    >
      <c-button
        rounded
        label="Click"
      />
    </c-tooltip>
    <div>
      <c-button
        label="Manual"
        flat
        @click="toggleShow"
      />
      <c-tooltip
        v-model:show="show"
        trigger="manual"
        content="Hello, world"
        style="margin-left: 12px;"
      >
        Click the left button
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
