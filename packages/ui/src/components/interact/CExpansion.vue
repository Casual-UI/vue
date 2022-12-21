<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { CIcon } from '@casual-ui/vue'
import { matKeyboardArrowDown } from '@quasar/extras/material-icons/index'
import { useDefaultVModel } from '../../usable/useVModel'

const props = withDefaults(defineProps<{
  /**
   * The icon string.
   * @zh 图标
   */
  icon?: string
  /**
   * The title.
   * @zh 标题
   */
  title?: string
  /**
   * The expand status. Can be used with <code>v-model</code>.
   * @zh 是否展开，用于<code>v-model</code>默认绑定
   */
  modelValue?: boolean
  /**
   * Determine whether to expand from top or not.
   * @zh 是否反向展开，如果设置为<code>true</code>则会从上方展开
   */
  reverse?: boolean
}>(), {
  title: '',
  modelValue: false,
  icon: '',
  reverse: false,
})

const emit = defineEmits<{
  /**
   * Emit when the expand status change.
   * @zh 展开状态变化时触发
   */
  (e: 'update:modelValue', newValue: boolean): void
}>()

const bodyDom = ref<HTMLDivElement | null>(null)
const initialBodyHeight = ref('auto')
const innerValue = ref(true)

useDefaultVModel(props, emit)

const onHeaderClick = () => {
  innerValue.value = !innerValue.value
}

onMounted(() => {
  initialBodyHeight.value = `${bodyDom.value?.clientHeight}px`
  innerValue.value = props.modelValue
})

const realtimeBodyHeigh = computed(() =>
  innerValue.value ? initialBodyHeight.value : 0,
)

const setHeight = (h: number) => {
  initialBodyHeight.value = `${h}px`
}

defineExpose({
  setHeight,
})
</script>

<template>
  <div
    class="c-expansion" :class="[{ 'c-expansion--expanded': innerValue }]"
    :style="`--casual-expansion-height:${realtimeBodyHeigh};`"
  >
    <div
      v-if="reverse"
      ref="bodyDom"
      class="c-expansion--body"
    >
      <!--
        @slot The expanded content.
        @zh 默认展开内容 -->
      <slot v-bind="{ setHeight }" />
    </div>
    <div
      class="c-expansion--header"
      @click.stop="onHeaderClick"
    >
      <div
        v-if="icon || $slots.icon"
        class="c-expansion--icon"
      >
        <!--
          @slot Customize the icon content.
          @zh 自定义图标 -->
        <slot name="icon">
          <CIcon :content="icon" />
        </slot>
      </div>
      <div class="c-expansion--title">
        <!--
          @slot Customize the title content.
          @zh 自定义标题 -->
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        class="c-expansion--arrow" :class="[
          { 'c-expansion--arrow-expanded': innerValue },
        ]"
      >
        <!--
          @slot Customize the arrow
          @zh 自定义箭头
            @binding {boolean} expand-status 当前展开状态
            @expandStatus_zh 当前展开状态
          -->
        <slot
          name="arrow"
          :expand-status="innerValue"
        >
          <CIcon
            class=""
            :content="matKeyboardArrowDown"
          />
        </slot>
      </div>
    </div>
    <div
      v-if="!reverse"
      ref="bodyDom"
      class="c-expansion--body"
    >
      <!--
        @slot The expanded content.
        @zh 默认展开内容 -->
      <slot v-bind="{ setHeight }" />
    </div>
  </div>
</template>
