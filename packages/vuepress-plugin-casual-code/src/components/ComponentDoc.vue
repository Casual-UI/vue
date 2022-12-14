<script
  setup
  lang="ts"
>
import { usePageFrontmatter, usePageLang } from '@vuepress/client'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { ComponentDoc } from 'vue-docgen-api'
import { CList } from '@casual-ui/vue'
import TypeDom from './TypeDom.vue'
import ItemDom from './ItemDom.vue'

interface SlotDesc {
  name: string
  description: string
}

interface CustomFrontmatter {
  docInfo: ComponentDoc
  customSlots?: SlotDesc[]
  eventsNameWidth?: number
  propDefaultValueWidth?: number
}

const props = defineProps<{
  /**
   * 如果传递该项，则会使用该项渲染，否则默认使用frontmatter中的docInfo
   */
  doc?: ComponentDoc
}>()
const lang = usePageLang()
const isChinese = computed(() => lang.value === 'zh-CN')

const frontmatter = usePageFrontmatter() as unknown as Ref<CustomFrontmatter>

const propList = computed(() =>
  props.doc ? props.doc.props || [] : frontmatter.value?.docInfo?.props || [],
)

const slots = computed(() =>
  props.doc
    ? props.doc.slots || []
    : [
        ...(frontmatter.value.customSlots || []),
        ...(frontmatter.value.docInfo.slots || []),
      ],
)

const events = computed(() =>
  props.doc ? props.doc.events || [] : frontmatter.value?.docInfo?.events || [],
)

const items = computed(() =>
  [
    { name: 'props' },
    { name: 'slots' },
    { name: 'events' },
    { name: 'methods' },
  ]
    .filter((item) => {
      const arr = frontmatter.value.docInfo[item.name]
      return arr && arr.length > 0
    })
    .map(({ name }) => ({
      name: name.toUpperCase().slice(0, 1) + name.slice(1),
    })),
)
const activeTab = ref('Props')

const slotNameFormatter = (slotItem: any) => {
  const name = slotItem.tags?.name
  if (name && name.length > 0)
    return name[0].description.split(' - ')[0]

  return slotItem.name
}

const descFormatter = (slotItem: any) => {
  if (slotItem.custom)
    return slotItem?.description

  const name = slotItem.tags?.name
  const zhName = slotItem.tags?.zh?.[0] || slotItem.tags?.name_zh?.[0]
  if (name && name.length > 0) {
    return isChinese.value
      ? zhName?.description
      : name[0].description.split(' - ')[1]
  }
  return isChinese.value ? zhName?.description : slotItem?.description
}

const getDefaultValue = (item: any) => {
  if (item.type.name === 'CSize')
    return '\'md\''

  if (item.type.name === 'CTheme')
    return '\'primary\''
  if (item.tags?.default)
    return item.tags.default[0].description

  return item.defaultValue?.value
}

const kebabToCamel = (str: string) =>
  str
    .split('-')
    .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1)))
    .join('')
</script>

<template>
  <div class="doc-api-container">
    <c-tabs
      v-model="activeTab"
      :panel-padding="false"
      :items="items"
    >
      <template #body-Props>
        <CList
          size="sm"
          :items="propList"
          divider
        >
          <template #item="{ item }">
            <ItemDom
              :value="item"
              :desc-formatter="
                propItem =>
                  isChinese
                    ? propItem.tags?.zh?.[0]?.description
                    : propItem.description
              "
            >
              <template #after-name>
                <div>
                  <TypeDom :val="item.type" />
                </div>
                <div>
                  <c-tag
                    v-if="item.required"
                    rounded
                    size="xs"
                    theme="negative"
                    label="*"
                  />
                  <span v-else>
                    {{ isChinese ? '默认值' : 'Default' }} &nbsp;<code>{{
                      getDefaultValue(item)
                    }}</code>
                  </span>
                </div>
              </template>
            </ItemDom>
          </template>
        </CList>
      </template>

      <template #body-Slots>
        <CList
          size="sm"
          :items="slots"
          divider
        >
          <template #item="{ item }">
            <ItemDom
              :value="item"
              :name-formatter="slotNameFormatter"
              :desc-formatter="descFormatter"
            >
              <div
                v-if="
                  item.bindings?.filter((bItem: any) => bItem.name !== 'name').length
                    > 0
                "
                class="c-pl-md"
              >
                <b>{{ isChinese ? '绑定值' : 'Bindings' }}</b>
                <CList
                  :items="item.bindings.filter((bItem: any) => bItem.name !== 'name')"
                  divider
                >
                  <template #item="{ item: bItem }">
                    <ItemDom
                      :value="bItem"
                      :desc-formatter="
                        binding =>
                          item.custom
                            ? binding.description
                            : isChinese
                              ? item.tags?.[
                                `${kebabToCamel(binding.name)}_zh`
                              ]?.[0]?.description
                              : binding.description
                      "
                    />
                  </template>
                </CList>
              </div>
            </ItemDom>
          </template>
        </CList>
      </template>

      <template #body-Events>
        <CList
          size="sm"
          :items="events"
          divider
        >
          <template #item="{ item }">
            <ItemDom
              :value="item"
              :desc-formatter="
                eItem =>
                  isChinese
                    ? eItem.tags?.find((tag: any) => tag.title === 'zh')?.content
                    : eItem.description
              "
            >
              <div
                v-if="item.tags?.some((tag: any) => tag.name)"
                class="c-pl-md"
              >
                <b>{{ isChinese ? '入参' : 'Params' }}</b>
                <CList
                  :items="
                    item.tags
                      .filter((tag: any) => tag.name?.indexOf('_') === -1)
                      .map((tag: any) => {
                        if (isChinese) {
                          return {
                            ...tag,
                            description:
                              item.tags.find(
                                (zhTag: any) => zhTag.name === `${tag.name}_zh`,
                              )?.description || tag.description,
                          }
                        }
                        return tag
                      })
                  "
                  divider
                >
                  <template #item="{ item: pItem }">
                    <ItemDom
                      :value="pItem"
                      :desc-wrap="false"
                    >
                      <template #after-name>
                        <div>
                          <TypeDom :val="pItem.type" />
                        </div>
                      </template>
                    </ItemDom>
                  </template>
                </CList>
              </div>
            </ItemDom>
          </template>
        </CList>
      </template>
    </c-tabs>
  </div>
</template>

<style
  scoped
  lang="scss"
>
.doc-api-container {
  background-color: var(--casual-table-bg);
  p {
    line-height: 2em;
  }
}
</style>
