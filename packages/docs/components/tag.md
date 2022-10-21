---
title: Tag
componentPath: basic/CTag
---


### Basic Usage

```vue live
<template>
  <c-tag label="A Tag" />
</template>
```

### Themes

```vue live
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <div>
      <c-tag label="Primary" />
    </div>
    <div>
      <c-tag label="Secondary" theme="secondary" rounded />
    </div>
    <div>
      <c-tag label="Warning" theme="warning" />
    </div>
    <div>
      <c-tag label="Negative" theme="negative" />
    </div>
  </div>
</template>
```

### Rounded

```vue live
<template>
  <c-tag rounded label="A rounded tag" />
</template>
```

### Sizes

```vue live
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <div>
      <c-tag label="xs tag" size="xs" />
    </div>
    <div>
      <c-tag label="sm tag" size="sm" />
    </div>
    <div>
      <c-tag label="md (default) tag" />
    </div>
    <div>
      <c-tag label="lg tag" size="lg" />
    </div>
    <div>
      <c-tag label="xl tag" size="xl" />
    </div>
  </div>
</template>
```

### Closeable

```vue live
<template>
  <div class="c-row c-gutter-x-md c-items-center">
    <div>
      <c-tag
        closeable
        label="A closeable tag"
        size="xs"
        theme="secondary" />
    </div>
    <div>
      <c-tag closeable label="A closeable tag" size="sm" />
    </div>
    <div>
      <c-tag closeable label="A closeable tag" theme="warning" />
    </div>
    <div>
      <c-tag closeable label="A closeable tag" size="lg" />
    </div>
    <div>
      <c-tag
        closeable
        label="A closeable tag"
        size="xl"
        theme="negative" />
    </div>
  </div>
</template>
```
