<script setup lang="ts">
import type { CTooltipPosition } from '@casual-ui/types'
import { useClickOutside } from '@casual-ui/vue'
import { recomputePos } from '@casual-ui/utils'
import { nextTick, onMounted, reactive, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * The popup content.
   * @zh 弹出的内容文字
   */
  content?: string | number
  /**
   * The popup position.
   * @zh 弹出位置
   */
  position?: CTooltipPosition
  /**
   * The trigger method.
   * @zh 触发方式
   */
  trigger?: 'hover' | 'click' | 'manual'
  /**
   * The show status of tooltip. Can be used with <code>v-model:show</code>. And only working when the trigger is <code>'manual'</code>
   * @zh 是否展示弹出内容，可以使用<code>v-model:show</code>，仅在<code>trigger = 'manual'</code>时可用
   */
  show?: boolean
}>(), {
  content: '',
  position: 'top',
  trigger: 'hover',
  show: false,
})

const emit = defineEmits<{
  /**
   * Emit when the show status change.
   * @zh 手动触发时使用，用于<code>v-model:show</code>绑定
   */
  (e: 'update:show', newShow: boolean): void
}>()

const innerShow = ref(props.show)
const pos = reactive({
  left: '0',
  top: '0'
})
const tooltipDom = ref<HTMLDivElement | undefined>()
const contentDom = ref<HTMLDivElement | undefined>()
const triggerDom = ref<HTMLDivElement | undefined>()
const arrowDom = ref<HTMLDivElement | undefined>()

watch(
  () => props.show,
  (newShow) => {
    innerShow.value = newShow
  },
)

watch(innerShow, newInnerShow => {
  emit('update:show', newInnerShow)
  if (newInnerShow) {
    nextTick(computePosition)
  }
})

const onMouseEnter = () => {
  if (props.trigger === 'hover')
    innerShow.value = true
}

const onMouseLeave = () => {
  if (props.trigger === 'hover')
    innerShow.value = false
}

if (props.trigger === 'click') {
  useClickOutside({
    elRef: tooltipDom,
    cbInside: () => {
      innerShow.value = !innerShow.value
    },
    cbOutside: () => {
      innerShow.value = false
    },
  })
}

onMounted(computePosition)

async function computePosition () {
  const { left, top } = await recomputePos({
    triggerDom: triggerDom.value,
    contentDom: contentDom.value,
    arrowDom: arrowDom.value,
    placement: props.position
  })
  Object.assign(pos, {
    left,
    top,
  })
}
</script>

<template>
  <div
    ref="tooltipDom"
    class="c-tooltip"
    :class="[{ 'c-tooltip--show': innerShow }]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :style="{
      '--c-tooltip-top': pos.top,
      '--c-tooltip-left': pos.left,
    }"
  >
    <div ref="triggerDom" class="c-tooltip--trigger">
      <!--
        @slot The trigger content.
        @zh 默认内容，用于触发tooltip -->
      <slot />
    </div>
    <div
      ref="contentDom"
      class="c-tooltip--content"
      @click.stop
    >
      <!--
        @slot The popup content. Will override the content prop.
        @zh 弹出层内容，如果设置了该插槽，会覆盖<code>content</code>属性 -->
      <slot name="popup">
        {{ content }}
      </slot>
      <div ref="arrowDom" class="c-tooltip--arrow" />
    </div>
  </div>
</template>
