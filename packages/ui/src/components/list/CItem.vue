<script setup lang="ts">
import type { CSize } from '@casual-ui/types'
import { useInjectSize } from '@casual-ui/vue'

const props = withDefaults(defineProps<{
  /**
   * The label text of item.
   * @zh 文字
   */
  label?: string | number
  /**
   * The size of item.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Determine whether the item is clickable or not.
   * @zh 是否表现为可点击交互
   */
  clickable?: boolean
  /**
   * Determine whether the item is in active status or not.
   * @zh 是否处于激活态
   */
  active?: boolean
}>(), {
  label: '',
  clickable: false,
  active: false,
})

const emit = defineEmits<{
  /**
   * Emit when the item is clicked. Only working when the clickable is true.
   * @zh 当clickable为true时，点击项目触发
   */
  (e: 'click'): void
}>()

const { provideSize } = useInjectSize(props)

const handleClick = () => {
  if (props.clickable)
    emit('click')
}
</script>

<template>
  <div
    class="c-item" :class="[
      { 'c-item--clickable': clickable },
      { 'c-item--active': active },
      `c-font-${provideSize}`,
      `c-pa-${provideSize}`,
    ]"
    @click="handleClick"
  >
    <!--
      @slot The content of item.
      @zh 默认内容，会覆盖<code>label</code>属性 -->
    <slot>
      <span :class="[`c-h-${provideSize}`]">
        {{ label }}
      </span>
    </slot>
  </div>
</template>
