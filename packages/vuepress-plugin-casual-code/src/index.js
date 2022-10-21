import { uid } from 'uid'
import { parse } from 'vue-docgen-api'
import path from 'path'
import { execSync } from 'child_process'
import MarkdownIt from 'markdown-it'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import { fileURLToPath } from 'url'

const mdd = MarkdownIt().use(frontmatterPlugin)

const componentDocMdContent = (name, doc = false) => `
### ${name} API  

<ComponentDoc class="c-mt-md" ${
  doc ? `:doc="$frontmatter.additionalComponentInfo.${name}"` : ''
} />
`
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const componentsIdMap= {}

const markdownItVueDemoCodeBlock = (pluginOptions) => {
  return {
    name: 'vupress-plugin-casual-code',
    clientConfigFile: path.resolve(__dirname, './clientConfig.js'),
    extendsMarkdown: async (md, app) => {
      const defaultRender = md.render

      md.render = function (src, env2) {
        const env = {}

        mdd.render(src, env)

        if (!env.frontmatter) {
          env.frontmatter = {}
        }

        const { componentPath, additionalComponentPaths, hooksPath } =
          env.frontmatter

        let result = src
        if (componentPath) {
          result = `${result} ${componentDocMdContent(
            componentPath.split('/').pop()
          )}`
        }
        if (
          additionalComponentPaths &&
          Array.isArray(additionalComponentPaths) &&
          additionalComponentPaths.length > 0
        ) {
          result = `${result} ${additionalComponentPaths
            .map(({ name }) => componentDocMdContent(name, true))
            .join('\n')}`
        }

        if (hooksPath) {
          result = `${result} \n ### ${hooksPath
            .split('/')
            .pop()} API \n <HooksApi />`
        }

        return defaultRender(`${result}`, env2)
      }

      const defaultFenceRenderer = md.renderer.rules.fence

      md.renderer.rules.fence = function (
        tokens,
        idx,
        options,
        env,
        self
      ) {
        if (!defaultFenceRenderer) return ''
        const key = `${env.filePathRelative}-${idx}`

        const { content, info } = tokens[idx]
        const defaultResult = defaultFenceRenderer(
          tokens,
          idx,
          options,
          env,
          self
        )
        const meta = info.split(' ')
        if (!meta.includes('vue') || !meta.includes('live'))
          return defaultResult
        const id = componentsIdMap[key] ? componentsIdMap[key] : uid()

        const TempDemoCodeComponentName = `TempDemoCodeComponent${id}`

        if (!env.frontmatter.sandboxCodes) {
          env.frontmatter.sandboxCodes = {}
        }
        env.frontmatter.sandboxCodes[TempDemoCodeComponentName] = content

        const path = `.casual/${env.filePathRelative.replace(
          /(\w|-)+\.md/,
          ''
        )}${TempDemoCodeComponentName}.vue`

        app.writeTemp(path, content)
        return `
        <div class="c-doc-demo">
          <DemoCode path="${TempDemoCodeComponentName}">
            <component :is="$resolveCasual(() => import('@temp/${path}'))"/>
            <template #code>
              ${defaultResult}
            </template>
          </DemoCode>
        </div>
      `
      }
    },
    extendsPage: async (page) => {
      page.frontmatter = page.frontmatter ?? {}
      if (page.frontmatter.componentPath) {
        const componentDocInfo = await parse(
          path.resolve(
            __dirname,
            `${pluginOptions.componentsBasePath}${page.frontmatter.componentPath}.vue`
          )
        )
        page.frontmatter.docInfo = componentDocInfo
      }
      if (page.frontmatter.additionalComponentPaths) {
        page.frontmatter.additionalComponentInfo = {}
        const additionalComponentPaths = page.frontmatter
          .additionalComponentPaths
        for (const { name, path: singlePath } of additionalComponentPaths) {
          page.frontmatter.additionalComponentInfo[name] = (await parse(
            path.resolve(
              __dirname,
              `${pluginOptions.componentsBasePath}${singlePath}.vue`
            )
          ))
        }
      }
      const hooksAPIPath = page.frontmatter.hooksPath
      if (hooksAPIPath) {
        const typesJsonPath = path.resolve(
          __dirname,
          `./.temp/${hooksAPIPath}.json`
        )
        execSync(
          `npx typedoc --tsconfig ${path.resolve(
            __dirname,
            '../../../tsconfig.json'
          )} --json ${typesJsonPath} ${
            pluginOptions.componentsBasePath
          }../${hooksAPIPath}.ts`
        )
        page.frontmatter.hooksInfo = await import(typesJsonPath, { assert: {
          type: 'json'
        } })
      }
    },
  }
}

export default markdownItVueDemoCodeBlock
