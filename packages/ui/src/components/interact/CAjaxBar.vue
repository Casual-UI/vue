<script setup lang="ts">
import type { CTheme } from '@casual-ui/types'
import { onUnmounted, ref } from 'vue'
import { useBEM } from '../../usable/useBEM'
import useInjectTheme from '../../usable/useInjectTheme'

const props = defineProps<{
  /**
   * The theme color of ajax bar
   * @default `'primary'`
   */
  theme?: CTheme
}>()

const barWidth = ref(0)

let startedFlag: ReturnType<typeof setInterval>

const maybeClear = () => {
  if (startedFlag)
    clearInterval(startedFlag)
}

onUnmounted(maybeClear)

const start = () => {
  barWidth.value = 0
  maybeClear()
  startedFlag = setInterval(() => {
    if (barWidth.value < 100)
      barWidth.value += 1
    else
      maybeClear()
  }, 200)
}

const end = () => {
  if (barWidth.value > 0) {
    barWidth.value = 100
    setTimeout(() => {
      barWidth.value = 0
    }, 100)
  }
  maybeClear()
}

const { provideTheme } = useInjectTheme(props)

defineExpose({
  start,
  end,
})
</script>

<template>
  <div
    :class="[useBEM('ajax-bar'), `c-ajax-bar--theme-${provideTheme}`]"
    :style="`--casual-ajax-bar-width: ${barWidth}%;`"
  >
    <div class="c-ajax-bar--progress" />
  </div>
</template>

