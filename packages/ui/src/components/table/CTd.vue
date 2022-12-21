<script lang="ts">
export interface CTdProps {
  width?: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<CTdProps>(), {
  width: 'auto',
})
</script>

<template>
  <td class="c-table--td" :style="{ width }">
    <slot />
  </td>
</template>
