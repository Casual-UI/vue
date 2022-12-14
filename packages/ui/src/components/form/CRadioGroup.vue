<script setup lang="ts">
import type { CSize } from '@casual-ui/types'
import useFormProps from './useFormProps'
import useValidator from './useValidator'

const props = withDefaults(defineProps<{
  /**
   * Current value. Used with <code>v-model</code>.
   * @zh 当前值，用于<code>v-model</code>绑定用
   */
  modelValue: boolean | string | number
  /**
   * The options array.
   * @zh 选项数组
   */
  options: { value: string | number; label: string }[]
  /**
   * The size.
   * @zh 尺寸
   * @default 'md'
   */
  size?: CSize
  /**
   * The gutter size between each radio.
   * @zh 单选器之间的间距
   * @default 'md'
   */
  gutterSize?: CSize
}>(), {
})

const emit = defineEmits<{
  /**
   * Emit when the  current value changed.
   * @zh 当前值变化时触发
   * @arg {any} newValue new value
   * @arg {any} newValue_zh
   */
  (e: 'update:modelValue', newValue: string | number): void
}>()

const { gutterSize } = useFormProps(props)

const { validate } = useValidator()

const onUpdateModelValue = (newValue: string | number) => {
  emit('update:modelValue', newValue)
  validate(newValue)
}
</script>

<template>
  <div
    class="c-flex c-items-center c-wrap"
    :class="[`c-gutter-${gutterSize}`]"
  >
    <div
      v-for="{ label, value } in options"
      :key="value"
    >
      <c-radio
        :model-value="modelValue"
        :label="label"
        :value="value"
        @update:model-value="onUpdateModelValue"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
