<script
setup
lang="ts"
>
import { ionCodeOutline } from '@quasar/extras/ionicons-v5/index'
import { matPlayArrow } from '@quasar/extras/material-icons/index'
import { computed, ref } from 'vue'
import { usePageFrontmatter, usePageLang } from '@vuepress/client'
import { CButton, CDialog, CExpansion, CIcon, CTooltip } from '@casual-ui/vue'
import createSandboxApp from './createSandboxApp'
import nightOwlTheme from './night-owl.json'

const props = withDefaults(
  defineProps<{
    path?: string
    content?: string
  }>(),
  {
    path: '',
    content: '',
  },
)

const showDialog = ref(false)

const show = ref(false)

const editorDom = ref()

const frontmatter = usePageFrontmatter()

const sandbox = ref()

let editor: any
let iframe: any
const run = () => {
  iframe.srcdoc = createSandboxApp(props.path, editor.getValue())
}

const onReplDialogOpened = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.require(['vs/editor/editor.main'], () => {
    const monaco = window.monaco
    const source = (frontmatter.value.sandboxCodes as any)[props.path]
    iframe = document.createElement('iframe')
    monaco.editor.defineTheme('night-owl', nightOwlTheme)
    monaco.editor.setTheme('night-owl')
    editor = monaco.editor.create(editorDom.value, {
      value: source,
      language: 'html',
      tabSize: 4,
      lineHeight: 1.5,
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, run)

    iframe.frameBorder = '0'
    iframe.width = '100%'
    iframe.style.flexGrow = '1'
    iframe.srcdoc = createSandboxApp(props.path, source)
    sandbox.value.appendChild(iframe)
  })
}

const lang = usePageLang()

const isChinese = computed(() => lang.value === 'zh-CN')
</script>

<template>
  <div class="demo-code c-mt-md">
    <div class="c-pa-md">
      <slot />
    </div>
    <CExpansion
      v-model="show"
      reverse
    >
      <template #icon>
        <div
          i-logos-vue
          text-5
        />
      </template>
      <template #title>
        <div class="c-flex c-items-center c-justify-between title">
          <div>
            {{ isChinese ? '点击展开/收起代码' : 'Click to open/fold code' }}
          </div>
          <!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
          <CTooltip
            :content="
              isChinese ? '点击打开交互式编辑器' : 'Open Vue Repl Editor'
            "
            @click.native.stop
          >
            <CButton
              icon
              outlined
              @click="showDialog = true"
            >
              <CIcon :content="ionCodeOutline" />
            </CButton>
          </CTooltip>
        </div>
      </template>
      <div>
        <slot name="code" />
      </div>
    </CExpansion>
  </div>
  <CDialog
    v-model="showDialog"
    :custom-style="{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }"
    :custom-body-style="{
      backgroundColor: 'var(--c-bg)',
      flexGrow: 1,
      height: 'unset',
      overflowY: 'auto',
    }"
    :close-on-esc="false"
    width="100vw"
    @opened="onReplDialogOpened"
  >
    <template #title>
      <CButton @click="run">
        <CIcon :content="matPlayArrow" />
        {{ isChinese ? '点击运行' : 'Click to Run' }}（Ctrl + S）
      </CButton>
    </template>
    <div class="c-flex repl c-items-stretch">
      <div class="editor-wrapper">
        <div
          ref="editorDom"
          class="editor"
        />
      </div>
      <div
        ref="sandbox"
        class="c-flex-grow c-pa-md sandbox"
      />
    </div>
  </CDialog>
</template>

<style lang="scss" scoped>
.demo-code {
  position: relative;
  overflow: visible;
  .copy-btn {
    position: absolute;
    bottom: 12px;
    z-index: 9;
    font-size: 14px;
    right: 12px;
  }
}
.repl {
  height: 100%;
}
.editor-wrapper {
  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.5em;
  overflow: auto;
  width: 50%;
  position: relative;
}
.editor {
  height: 100%;
}
.sandbox {
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: #fefefe;
}
.title {
  font-size: 14px;
}
</style>
