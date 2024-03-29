<script setup lang="ts">
import {
  matKeyboardArrowLeft,
  matKeyboardArrowRight,
  matKeyboardDoubleArrowLeft,
  matKeyboardDoubleArrowRight,
} from '@quasar/extras/material-icons'
import type { CSize } from '@casual-ui/types'
import { useInjectSize } from '@casual-ui/vue'
import { computed, toRefs } from 'vue'
import useDisplayMonth from './useDisplayMonth'
import type { Unit } from './useUnit'

const props = withDefaults(defineProps<{
  year?: number
  month?: number
  size?: CSize
  unit?: Unit
  yearRange?: [number, number]
  unitSwitchable?: boolean
}>(), {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  unit: 'day',
  yearRange: () => [new Date().getFullYear(), new Date().getFullYear() + 11],
  unitSwitchable: true,
})

const emit = defineEmits<{
  (e: 'update:yearRange', yearRange: [number, number]): void
  (e: 'update:year', newValue: number): void
  (e: 'update:month', newValue: number): void
  (e: 'update:unit', newValue: Unit): void
}>()

const { provideSize: size } = useInjectSize(props)

const { year, month, unit } = toRefs(props)

// 获取当前年月对应的日期
function getCurrentYearMonthDate() {
  const d = new Date()
  d.setDate(1)
  d.setFullYear(year.value)
  d.setMonth(month.value)
  return d
}

// 根据指定日期重新设置当前年月
function resetYearMonth(d: Date) {
  emit('update:year', d.getFullYear())
  emit('update:month', d.getMonth())
}

function toPrevMonth() {
  const d = getCurrentYearMonthDate()
  d.setMonth(d.getMonth() - 1)
  resetYearMonth(d)
}

function toNextMonth() {
  const d = getCurrentYearMonthDate()
  d.setMonth(d.getMonth() + 1)
  resetYearMonth(d)
}

function toPrevYear() {
  const d = getCurrentYearMonthDate()
  d.setFullYear(d.getFullYear() - 1)
  resetYearMonth(d)
}

function toNextYear() {
  const d = getCurrentYearMonthDate()
  d.setFullYear(d.getFullYear() + 1)
  resetYearMonth(d)
}

const { yearRange } = toRefs(props)

function previousYearRange() {
  emit('update:yearRange', [yearRange.value[0] - 12, yearRange.value[1] - 12])
}

function nextYearRange() {
  emit('update:yearRange', [yearRange.value[0] + 12, yearRange.value[1] + 12])
}

const { displayMonth } = useDisplayMonth(month)

const isDay = computed(() => unit.value === 'day')
const isMonth = computed(() => unit.value === 'month')
function setUnit(newUnit: Unit) {
  if (!props.unitSwitchable)
    return
  emit('update:unit', newUnit)
}
</script>

<template>
  <div
    class="c-date-panel--header"
    :class="[`c-px-${size}`, `c-pt-${size}`]"
  >
    <div class="c-flex c-items-center">
      <slot name="left">
        <c-icon
          v-if="isMonth || isDay"
          :content="matKeyboardDoubleArrowLeft"
          @click="toPrevYear"
        />
        <c-icon
          v-else
          :content="matKeyboardDoubleArrowLeft"
          @click="previousYearRange"
        />
        <c-icon
          v-if="isDay"
          :content="matKeyboardArrowLeft"
          @click="toPrevMonth"
        />
      </slot>
    </div>
    <div
      class="c-date-panel--year"
      :class="[
        {
          'c-date-panel--year-switchable': unit !== 'year' && unitSwitchable,
        },
      ]"
    >
      <slot name="title">
        <span
          v-if="isDay"
          @click.stop="setUnit('month')"
        >
          {{ displayMonth }}
        </span>
        &nbsp;
        <span
          v-if="isDay || isMonth"
          @click.stop="setUnit('year')"
        >
          {{ year }}
        </span>
        <span v-else> {{ yearRange[0] }} - {{ yearRange[1] }} </span>
      </slot>
    </div>
    <div class="c-flex c-items-center">
      <slot name="right">
        <c-icon
          v-if="isDay"
          :content="matKeyboardArrowRight"
          @click="toNextMonth"
        />
        <c-icon
          v-if="isDay || isMonth"
          :content="matKeyboardDoubleArrowRight"
          @click="toNextYear"
        />
        <c-icon
          v-else
          :content="matKeyboardDoubleArrowRight"
          @click="nextYearRange"
        />
      </slot>
    </div>
  </div>
</template>
