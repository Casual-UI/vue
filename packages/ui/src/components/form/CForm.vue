<script lang="ts">
export const errorKey = Symbol('errorStatus')
export const validatorsKey = Symbol('validators')

export type FormItemComponent =
  | 'input'
  | 'select'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio'
  | 'radio-group'
  | 'date-picker'
  | 'toggle'
  | Component

/**
 * The form config item.
 * @zh 表单项配置
 */
export interface CFormItemConfig {
  /**
   * The component.
   * @zh 表单项类型，对应需要渲染的组件
   */
  component?: FormItemComponent
  /**
   * The props passed to the component.
   * @zh 需要传递给组件的属性选项
   */
  componentProps?: object
  /**
   * The field key of whole form data.
   * @zh 对应表单数据字段名称
   */
  field: string
  /**
   * The label text
   * @zh 表单项文案提示
   */
  label?: string
  /**
   * The validators
   * @zh 验证规则
   */
  rules?: CRule[]
  /**
   * The col span
   * @zh 项的自定义列宽
   */
  col?: number
}
</script>

<script setup lang="ts">
import type { Component } from 'vue'
import { nextTick, provide, ref } from 'vue'
import type { CRule, CSize } from '@casual-ui/types'
import { useDefaultVModel } from '../../usable/useVModel'
import useFormProps, { type LabelDirection } from './useFormProps'
import CFormItem from './CFormItem.vue'

const props = withDefaults(defineProps<{
  /**
   * The form items config
   * @zh 表单项配置
   */
  items?: CFormItemConfig[]
  /**
   * The whole form data. Can be used with <code>v-model</code>.
   * @zh 表单绑定值，用于<code>v-model</code>
   */
  modelValue?: Record<string, any>
  /**
   * The label width.
   * @zh 表单项提示文案长度
   * @default '100px'
   */
  labelWidth?: string
  /**
   * The col span
   * @zh 每个表单项占用的列数
   * @default 6
   */
  col?: number
  /**
   * The label and form component direction.
   * @zh 文本排列方向，表现为flex-direction的对应值
   * @default 'row'
   */
  labelDirection?: LabelDirection
  /**
   * The label align method.
   * @zh 文字对齐方式，表现为text-align的对应值
   * @default 'left'
   */
  labelAlign?: 'left' | 'center' | 'right'
  /**
   * The size. It will affect all components within.
   * @zh 尺寸
   * @default 'md'
   */
  size?: CSize
  /**
   * The gutter size.
   * @zh 表单项间隔尺寸
   */
  gutterSize?: CSize

  /**
   * Determine whether the whole form is in validating or not. Can be used with <code>v-model:validating</code>. It maybe helpful when some async status loading is required
   * @zh 是否在验证中，可用于<code>v-model:validating</code>绑定，在具有异步验证规则时可能会需要这个属性用作一些状态展示
   */
  validating?: boolean
}>(), {
  items: () => [],
  modelValue: () => ({}),
  gutterSize: 'md',
  labelAlign: undefined,
  validating: false,
})
const emit = defineEmits<{
  /**
   * Emit when the form data is changed.
   * @zh 表单绑定值变化时触发
   * @arg {any} newModelValue_zh 新的绑定值
   * @arg {any} newModelValue new form data
   */
  (e: 'update:modelValue', newModelValue: object): void
  /**
   * Emit when the validating status change.
   * @zh 表单验证进行中状态变更触发
   * @arg {boolean} newValidating_zh 新的验证状态
   * @arg {boolean} newValidating new validating status
   */
  (e: 'update:validating', newValidating: boolean): void
}>()

interface Option {
  value: string | number
  label: string
}

const innerValue = useDefaultVModel(props, emit)
useFormProps(props)

/**
 * Determine which component should be used to render the form item.
 * @zh 决定渲染何种组件，默认渲染输入框
 */
const getComponent = (component?: FormItemComponent) => {
  if (!component)
    return 'c-input'
  if (typeof component === 'string')
    return `c-${component}`

  return component
}

const errorStatus = ref<{
  [key: string]: {
    error: boolean
    message: string
  }
}>(
  props.items.reduce(
    (obj, { field }) => ({
      ...obj,
      [field]: {
        error: false,
        message: '',
      },
    }),
    {},
  ),
)

provide(errorKey, errorStatus)
const validators: ((formData: any) => Promise<void>)[] = []
provide(validatorsKey, validators)
const validatingCount = ref(0)

const addOneValidate = () => {
  if (validatingCount.value === 0)
    emit('update:validating', true)

  validatingCount.value++
}

const reduceOneValidate = () => {
  validatingCount.value--
  if (validatingCount.value === 0)
    emit('update:validating', false)
}
const validate = () => {
  return new Promise<void>((resolve) => {
    validators.forEach(validator => validator(innerValue.value))
    Promise.all(validators.map(validator => validator(innerValue.value))).then(
      () => {
        nextTick(() => {
          if (Object.values(errorStatus.value).every(({ error }) => !error))
            resolve()
        })
      },
    )
  })
}

const clearAll = () => {
  errorStatus.value = props.items.reduce(
    (obj, { field }) => ({
      ...obj,
      [field]: {
        error: false,
        message: '',
      },
    }),
    {},
  )
}

defineExpose({
  validate,
  clearAll,
})
</script>

<script>
</script>

<template>
  <div
    class="c-form c-row c-items-center c-wrap" :class="[
      `c-gutter-${gutterSize}`,
    ]"
  >
    <!--
      @slot The default content. This would override the config items generated content.
      @zh 默认插槽，会覆盖配置式生成的内容 -->
    <slot>
      <CFormItem
        v-for="item in items"
        :key="item.field"
        :label="item.label"
        :field="item.field"
        :col="item.col"
        :rules="item.rules"
        @validate-start="addOneValidate"
        @validate-end="reduceOneValidate"
      >
        <template
          #default="{ validate: validateCurrentItem, clearValidate, hasError }"
        >
          <!--
            @slot
            @name_zh 表单项的自定义内容，field为表单项的field属性
            @name [field] - Customize a specific form item. Field is the FormItem field prop.
              @binding {Function} validate The function to validate current item.
              @validate_zh 验证当前表单项的方法
              @binding {Function} clearValidate The function clear current item validate status.
              @clearValidate_zh 清除当前表单项验证状态的方法
              @binding {boolean} hasError Determine whether the current item has error or not.
              @hasError_zh 当前表单项是否有错误
          -->
          <slot
            :name="item.field"
            v-bind="{
              validate: () => validateCurrentItem(modelValue[item.field]),
              clearValidate,
              hasError,
            }"
          >
            <Component
              :is="getComponent(item.component)"
              v-model="innerValue[item.field]"
              v-bind="item.componentProps"
            />
          </slot>
        </template>
      </CFormItem>
    </slot>
  </div>
</template>
