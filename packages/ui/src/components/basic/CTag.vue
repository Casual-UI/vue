<script setup lang="ts">
import type { CSize, CTheme } from '@casual-ui/types'
import { CIcon, useInjectSize, useInjectTheme } from '@casual-ui/vue'
import { matClose } from '@quasar/extras/material-icons'

const props = withDefaults(defineProps<{
  /**
   * The label text.
   * @zh 标签内文字
   */
  label?: string
  /**
   * The theme color.
   * @zh 主题
   */
  theme?: CTheme
  /**
   * The size.
   * @zh 尺寸
   */
  size?: CSize
  /**
   * Determine whether the tag has rounded border.
   * @zh 是否为圆角
   */
  rounded?: boolean
  /**
   * Determine whether to show a close icon or not.
   * @zh 是否可关闭，设置为<code>true</code>会展示一个关闭图标
   */
  closeable?: boolean
}>(), {
  label: '',
  rounded: false,
  closeable: false,
})

defineEmits<{
  /**
   * Emit when the close icon is clicked.
   * @zh 点击关闭图标触发
   */
  (e: 'close'): void
}>()

const { provideTheme } = useInjectTheme(props)

const { provideSize: size } = useInjectSize(props)
</script>

<template>
  <div
    class="c-tag" :class="[
      `c-tag--theme-${provideTheme}`,
      `c-h-${size}`,
      `c-font-${size}`,
      `c-px-${size}`,
      rounded ? `c-rounded-${size}` : '',
    ]"
  >
    <div class="c-tag--prefix">
      <!--
        @slot Customize prefix content
        @zh 自定义前置内容
      -->
      <slot name="prefix" />
    </div>
    <div class="c-tag--label">
      {{ label }}
    </div>
    <div
      v-if="closeable"
      class="c-tag--close-icon c-ml-xs"
      @click.stop="$emit('close')"
    >
      <CIcon :content="matClose" />
    </div>
  </div>
</template>
