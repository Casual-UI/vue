## Introduction 
The vue version repo of Casual UI
Include these parts:
- The ui components source code
- The docs site
- The vuepress relative plugins

## Online Docs & Demos

[Casual UI - Vue](https://casual-ui-vue.donsen.site/)

## Usage Guide

- Install
```sh
# via npm
npm install @casual-ui/vue

# via yarn
yarn add @casual-ui/vue

# via pnpm
pnpm install @casual-ui/vue
```
- Import style in entry file
```js
// main.js
import '@casual-ui/vue/dist/style.css'
```
- Global usage
```js
// main.js
import { createApp } from 'vue'
import CasualUI from '@casual-ui/vue'
const app = createApp()
app.use(CasualUI)
```
Then in .vue file
```vue
<template>
  <CButton label="A Button" />
</template>
```
- Single usage
```vue
<script setup>
import { CButton } from '@casual-ui/vue'
</script>

<template>
  <CButton label="A Button" />
</template>
```
## Contributing

[Contributing](./CONTRIBUTING.md)

## LICENSE

[MIT](https://opensource.org/licenses/MIT)
