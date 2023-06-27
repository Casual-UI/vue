---
title: Button
componentPath: basic/button/CButton
---

### Basic

```vue live
<template>
  <c-button label="Normal Button" />
  <c-button
    label="Outlined Button"
    outlined
  />
  <c-button
    label="Rounded Button"
    rounded
  />
  <c-button
    label="Round Button"
    round
  />
  <c-button
    label="Flat Button"
    flat
    rounded
  />
</template>
```

### Themes

```vue live
<template>
  <div class="c-row c-gutter-md c-wrap">
    <div>
      <c-button label="Primary" theme="primary" />
    </div>
    <div>
      <c-button label="Secondary" theme="secondary" />
    </div>
    <div>
      <c-button
        label="Warning"
        theme="warning"
      />
    </div>
    <div>
      <c-button
        label="Negative"
        theme="negative"
      />
    </div>
    <div>
      <c-button
        label="Primary"
        theme="primary"
        outlined
      />
    </div>
    <div>
      <c-button
        label="Secondary"
        theme="secondary"
        outlined
      />
    </div>
    <div>
      <c-button
        label="Warning"
        theme="warning"
        outlined
      />
    </div>
    <div>
      <c-button
        label="Negative"
        theme="negative"
        outlined
      />
    </div>
    <div>
      <c-button
        label="Primary"
        theme="primary"
        flat
      />
    </div>
    <div>
      <c-button
        label="Secondary"
        theme="secondary"
        flat
      />
    </div>
    <div>
      <c-button
        label="Warning"
        theme="warning"
        flat
      />
    </div>
    <div>
      <c-button
        label="Negative"
        theme="negative"
        flat
      />
    </div>
  </div>
</template>
```

### Shapes

```vue live
<script setup>
import { CButton } from '@casual-ui/vue'
</script>

<template>
  <CButton
    label="Rounded"
    rounded
  />
  <CButton
    label="Round"
    round
  />
</template>
```

### Sizes

```vue live
<template>
  <div class="c-row c-items-center c-gutter-md c-wrap">
    <div>
      <c-button
        label="xs Button"
        size="xs"
        theme="negative"
      />
    </div>
    <div>
      <c-button
        label="sm Button"
        size="sm"
        theme="negative"
      />
    </div>
    <div>
      <c-button
        label="md Button"
        size="md"
        theme="negative"
      />
    </div>
    <div>
      <c-button
        label="lg Button"
        size="lg"
        theme="negative"
      />
    </div>
    <div>
      <c-button
        label="xl Button"
        size="xl"
        theme="negative"
      />
    </div>
  </div>
</template>
```

### Status

```vue live
<template>
  <c-button
    label="Disabled Button"
    disabled
  />
  <c-button
    label="Loading Button"
    loading
  />
</template>
```

### Block

```vue live
<template>
  <div class="c-mb-md">
    <c-button
      label="Block Button"
      block
      size="lg"
      theme="warning"
    />
  </div>
  <div class="c-mb-md">
    <c-button
      label="Block Button"
      block
      size="lg"
      rounded
    />
  </div>
  <div>
    <c-button
      label="Block Button"
      block
      size="lg"
      round
      theme="negative"
      outlined
    />
  </div>
</template>
```

### Customize Loading Icon

```vue live
<template>
  <c-button
    label="Loading"
    loading
  >
    <template #loading>
      <c-loading-audio />
    </template>
  </c-button>
  <c-button
    label="Loading"
    loading
    outlined
    round
  >
    <template #loading>
      <c-loading-dot />
    </template>
  </c-button>
  <c-button
    label="Loading"
    outlined
    rounded
    loading
  >
    <template #loading>
      <c-loading-bar />
    </template>
  </c-button>
</template>
```

### Icon Button

```vue live
<script setup>
import {
  matBuild,
  matCoPresent,
  matDeviceHub,
} from '@quasar/extras/material-icons'
</script>

<template>
  <c-button icon>
    <c-icon :content="matBuild" />
  </c-button>
  <c-button
    icon
    theme="secondary"
  >
    <c-icon :content="matBuild" />
  </c-button>
  <c-button
    icon
    style="font-size: 24px"
    theme="warning"
  >
    <c-icon :content="matCoPresent" />
  </c-button>
  <c-button
    outlined
    icon
    style="font-size: 32px"
    theme="negative"
  >
    <c-icon :content="matDeviceHub" />
  </c-button>
</template>
```
