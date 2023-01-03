---
title: Drawer
componentPath: popup/CDrawer
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
  <CButton
    label="Click to open drawer"
    @click="show = true"
  />

  <CDrawer
    v-model="show"
    title="Hi, there"
  >
    Some drawer content
  </CDrawer>
</template>
```

### Positions

```vue live
<script setup>
import { ref } from 'vue'
import {
  matArrowBack,
  matArrowDownward,
  matArrowForward,
  matArrowUpward,
} from '@quasar/extras/material-icons/index'

const show = ref(false)
const position = ref('left')

function openWithPosition(pos) {
  position.value = pos
  show.value = true
}
</script>

<template>
  <div class="c-flex c-gutter-md c-wrap">
    <div>
      <c-button
        icon
        @click="openWithPosition('left')"
      >
        <c-icon :content="matArrowBack" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        @click="openWithPosition('top')"
      >
        <c-icon :content="matArrowUpward" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        @click="openWithPosition('right')"
      >
        <c-icon :content="matArrowForward" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        @click="openWithPosition('bottom')"
      >
        <c-icon :content="matArrowDownward" />
      </c-button>
    </div>
  </div>

  <c-drawer
    v-model="show"
    title="Hi, there"
    :position="position"
  >
    I'm some drawer content
  </c-drawer>
</template>
```
