<script setup lang="ts">
import { computed, toRefs } from 'vue'
import CDateGridPanel from './CDateGridPanel.vue'

const props = withDefaults(defineProps<{
  modelValue: Date | null
  year?: number
}>(), {
  modelValue: () => new Date(),
  year: new Date().getFullYear(),
})

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: Date | null): void
}>()

const { year, modelValue } = toRefs(props)

const getDisplayMonth = (month: number) => {
  const d = new Date()
  d.setDate(1)
  d.setFullYear(year.value)
  d.setMonth(month)
  return d.toLocaleDateString('en-US', { month: 'short' })
}

const isSelected = (month: number) => {
  if (!modelValue.value)
    return false
  const d = new Date(modelValue.value?.getTime())
  d.setFullYear(year.value)
  d.setMonth(month)
  return d.getTime() === modelValue.value.getTime()
}

const items = computed(() =>
  Array(12)
    .fill(0)
    .map((_, i) => i),
)

const onMonthClick = (month: number) => {
  emit(
    'update:modelValue',
    new Date(year.value, month, modelValue.value?.getDate() || 1),
  )
}
</script>

<template>
  <CDateGridPanel
    :is-active="isSelected"
    :items="items"
    :display-formatter="getDisplayMonth"
    @item-click="onMonthClick"
  />
</template>
