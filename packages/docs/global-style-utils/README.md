---
title: Global CSS Utils

---

### Sizes

```scss
$basic-font-sizes: (
  'xs': 12px,
  'sm': 12px,
  'md': 14px,
  'lg': 16px,
  'xl': 16px,
);
```

| Class    | Equals to CSS                         |
| -------- | ------------------------------------- |
| `c-h-xs` | `font-size: 12px; line-height: 12px;` |
| `c-h-sm` | `font-size: 12px; line-height: 12px;` |
| `c-h-md` | `font-size: 14px; line-height: 14px;` |
| `c-h-lg` | `font-size: 16px; line-height: 16px;` |
| `c-h-xl` | `font-size: 16px; line-height: 16px;` |

### Border Radius

```scss
$basic-rounded-sizes: (
  'xs': 4px,
  'sm': 4px,
  'md': 8px,
  'lg': 12px,
  'xl': 12px,
);
```

| Class          | Equals to CSS          |
| -------------- | ---------------------- |
| `c-rounded-xs` | `border-radius: 4px;`  |
| `c-rounded-sm` | `border-radius: 4px;`  |
| `c-rounded-md` | `border-radius: 8px;`  |
| `c-rounded-lg` | `border-radius: 12px;` |
| `c-rounded-xl` | `border-radius: 12px;` |

### flex

| Class                       | Equals to CSS                     |
| --------------------------- | --------------------------------- |
| `o-flex` `c-column` `c-row` | `display: inline-flex;`           |
| `c-justify-start`           | `justify-content: flex-start;`    |
| `c-justify-center`          | `justify-content: center;`        |
| `c-justify-end`             | `justify-content: flex-end;`      |
| `c-justify-between`         | `justify-content: space-between;` |
| `c-justify-evenly`          | `justify-content: space-evenly;`  |
| `c-justify-around`          | `justify-content: space-around;`  |
| `c-items-start`             | `align-items: flex-start;`        |
| `c-items-center`            | `align-items: flex-center;`       |
| `c-items-end`               | `align-items: flex-end;`          |
| `c-items-baseline`          | `align-items: baseline;`          |
| `c-items-stretch`           | `align-items: stretch;`           |

### Spaces

```scss
$sizes: (
  'xs': 4px,
  'sm': 8px,
  'md': 12px,
  'lg': 16px,
  'xl': 24px,
);
```

`.o-[p | m][a | x | y| l | t | r | b]-[xs | sm | md | lg | xl]`

| Class     | Equals to CSS                              |
| --------- | ------------------------------------------ |
| `c-pa-md` | `padding: 12px;`                           |
| `c-mr-sm` | `margin-right: 8px;`                       |
| `c-px-lg` | `padding-left: 16px; padding-right: 16px;` |
| ...       | ...                                        |

### Row & Cols

Casual UI use 12 cols per row

`c-col-[colSize]`

### Gutter Sizes

::: tip
`.c-row` or `.c-column` need to be used along with
:::

`.c-gutter[-x | -y ]-[xs | sm | md | lg | xl]`

| Class               | Equals to CSS                                       |
| ------------------- | --------------------------------------------------- |
| `c-gutter-x-[size]` | has a gutter `[size]` on horizontal                 |
| `c-gutter-y-[size]` | has a gutter `[size]` on vertical                   |
| `c-gutter-[size]`   | has gutter `[size]` on both horizontal and vertical |

### Some Examples

```vue live
<template>
  <div class="c-row c-gutter-x-sm">
    <div
      v-for="n in 6"
      :key="n"
      class="c-col-2"
    >
      <div>col-2 + gutter-sm</div>
    </div>
  </div>
  <div class="c-row c-gutter-x-md c-mt-md">
    <div
      v-for="n in 4"
      :key="n"
      class="c-col-3"
    >
      <div>col-3 + gutter-md</div>
    </div>
  </div>
  <div class="c-row c-gutter-x-lg c-mt-md">
    <div
      v-for="n in 3"
      :key="n"
      class="c-col-4"
    >
      <div>col-4 + gutter-lg</div>
    </div>
  </div>
</template>

<style scoped>
.c-col-2 > div,
.c-col-3 > div,
.c-col-4 > div {
  border: 1px solid #333;
  background-color: var(--casual-primary);
  padding: 12px 0;
  color: #fff;
  text-align: center;
}
</style>
```

### Transition Curves

```vue live hide-code
<template>
  <div class="c-row c-wrap c-gutter-md">
    <div
      v-for="n in 8"
      :key="n"
      class="motion-item"
    />
  </div>
  <div class="c-row c-wrap c-gutter-md">
    <div
      v-for="n in 8"
      :key="n"
      class="motion-item-eio"
    />
  </div>
  <div class="c-row c-wrap c-gutter-md">
    <div
      v-for="n in 8"
      :key="n"
      class="motion-item-ei"
    />
  </div>
</template>

<style
  scoped
  lang="scss"
>
@keyframes circle {
  from {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
}
.motion-item,
.motion-item-eio,
.motion-item-ei {
  width: 72px;
  height: 72px;
  background-color: var(--casual-primary);
  border-radius: 50%;
  background-clip: content-box;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-name: circle;
}
.motion-item {
  &:nth-child(1) {
    animation-timing-function: var(--casual-ease-out-circle);
  }
  &:nth-child(2) {
    animation-timing-function: var(--casual-ease-out-overshoots);
  }
  &:nth-child(3) {
    animation-timing-function: var(--casual-ease-out-quadratic);
  }
  &:nth-child(4) {
    animation-timing-function: var(--casual-ease-out-cubic);
  }
  &:nth-child(5) {
    animation-timing-function: var(--casual-ease-out-quartic);
  }
  &:nth-child(6) {
    animation-timing-function: var(--casual-ease-out-quintic);
  }
  &:nth-child(7) {
    animation-timing-function: var(--casual-ease-out-exponential);
  }
  &:nth-child(8) {
    animation-timing-function: var(--casual-ease-out-sin);
  }
}
.motion-item-eio {
  &:nth-child(1) {
    animation-timing-function: var(--casual-ease-in-out-circle);
  }
  &:nth-child(2) {
    animation-timing-function: var(--casual-ease-in-out-overshoots);
  }
  &:nth-child(3) {
    animation-timing-function: var(--casual-ease-in-out-quadratic);
  }
  &:nth-child(4) {
    animation-timing-function: var(--casual-ease-in-out-cubic);
  }
  &:nth-child(5) {
    animation-timing-function: var(--casual-ease-in-out-quartic);
  }
  &:nth-child(6) {
    animation-timing-function: var(--casual-ease-in-out-quintic);
  }
  &:nth-child(7) {
    animation-timing-function: var(--casual-ease-in-out-exponential);
  }
  &:nth-child(8) {
    animation-timing-function: var(--casual-ease-in-out-sin);
  }
}
.motion-item-ei {
  &:nth-child(1) {
    animation-timing-function: var(--casual-ease-in-circle);
  }
  &:nth-child(2) {
    animation-timing-function: var(--casual-ease-in-overshoots);
  }
  &:nth-child(3) {
    animation-timing-function: var(--casual-ease-in-quadratic);
  }
  &:nth-child(4) {
    animation-timing-function: var(--casual-ease-in-cubic);
  }
  &:nth-child(5) {
    animation-timing-function: var(--casual-ease-in-quartic);
  }
  &:nth-child(6) {
    animation-timing-function: var(--casual-ease-in-quintic);
  }
  &:nth-child(7) {
    animation-timing-function: var(--casual-ease-in-exponential);
  }
  &:nth-child(8) {
    animation-timing-function: var(--casual-ease-in-sin);
  }
}
</style>
```
<div class="c-doc-demo">
  <c-expansion :title="siteLocaleData.seeVarsDefinition" :model-value="false">

@[code](../../../packages/styles/src/variables/motion-curves.scss)

  </c-expansion>
</div>

### Grids

| Class               | Equals to CSS                                |
| ------------------- | -------------------------------------------- |
| `o-gid`             | `display: grid;`                             |
| `c-grid-col-[1-12]` | `grid-template-columns: repeat([1-12], 1fr)` |
| `c-grid-row-[1-12]` | `grid-template-rows: repeat([1-12], 1fr)`    |
| `c-grid-gap-xs`     | `gaps: 4px;`                                 |
| `c-grid-gap-sm`     | `gaps: 8px;`                                 |
| `c-grid-gap-xs`     | `gaps: 12px;`                                |
| `c-grid-gap-lg`     | `gaps: 16px;`                                |
| `c-grid-gap-xl`     | `gaps: 24px;`                                |

```vue live
<template>
  <div class="c-grid c-grid-col-4 c-grid-row-4 c-grid-gap-md custom-grid">
    <div
      v-for="n in 16"
      :key="n"
      class="custom-grid--item"
    >
      {{ n }}
    </div>
  </div>
</template>

<style scoped>
.custom-grid--item {
  text-align: center;
  background: var(--casual-primary);
  color: #fff;
  height: 80px;
  line-height: 80px;
}
</style>
```

<script setup>
  import { useSiteLocaleData } from '@vuepress/client'
  const siteLocaleData = useSiteLocaleData()
</script>