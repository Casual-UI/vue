<script lang="ts">
export interface CTdProps {
  width?: string
}
</script>

<script lang="ts" setup>
withDefaults(defineProps<CTdProps>(), {
  width: 'auto',
})
</script>

<template>
  <th class="c-table--th" :style="{ width }">
    <slot />
  </th>
</template>
