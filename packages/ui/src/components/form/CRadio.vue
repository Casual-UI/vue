<script lang="ts">
export type CRadioModel = boolean | string | number
</script>

<script setup lang="ts">
import type { CSize } from '@casual-ui/types'
import { useDefaultVModel, useInjectSize } from '@casual-ui/vue'
import useValidator from './useValidator'

const props = withDefaults(defineProps<{
  /**
   * Current value. Can be used with <code>v-model</code>.
   * @zh 当前值，用于<code>v-model</code>绑定用
   */
  modelValue: CRadioModel
  /**
   * The value used for selected.
   * @zh 选中时的值
   */
  value?: CRadioModel
  /**
   * The label text.
   * @zh 文字
   */
  label?: string | number
  /**
   * The size
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Determine whether the radio is disabled or not.
   * @zh 是否禁用
   */
  disabled?: boolean
}>(), {
  label: '',
  disabled: false,
  value: true,
})

const emit = defineEmits<{
  /**
   * Emit when the radio value changed.
   * @zh 值发生变化时触发
   * @arg {any} newValue_zh - 新的绑定值
   * @arg {any} newValue - new selected value
   */
  (e: 'update:modelValue', newModelValue: CRadioModel): void
}>()

const { provideSize } = useInjectSize(props)

const innerValue = useDefaultVModel(props, emit)

const onClick = () => {
  if (props.disabled)
    return
  if (props.value === innerValue.value)
    return

  innerValue.value = props.value
}
const { hasError } = useValidator()
</script>

<template>
  <div
    class="c-radio" :class="[
      `c-font-${provideSize}`,
      `c-h-${provideSize}`,
      `c-radio--size-${provideSize}`,
      { 'c-radio--selected': innerValue === value },
      { 'c-radio--disabled': disabled },
      {
        'c-radio--has-error': hasError,
      },
    ]"
    @click="onClick"
  >
    <svg
      class="c-radio--circle-wrapper"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        d="M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
      />
      <path
        class="c-radio--inner-circle"
        d="M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
      />
    </svg>
    <div class="c-radio--label">
      {{ label }}
    </div>
  </div>
</template>
