import CasualUI, { CNotification } from '@casual-ui/vue'
import { defineClientConfig } from '@vuepress/client'
import 'uno.css'
import '@casual-ui/styles'

export default defineClientConfig({
  enhance({ app }) {
    app.use(CasualUI)
  },
  rootComponents: [CNotification],
})
