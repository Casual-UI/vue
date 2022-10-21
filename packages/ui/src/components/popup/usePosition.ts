import type { CPosition } from '@casual-ui/types'
import { useInjectProp } from '@casual-ui/vue'

export default (props: any) => {
  return {
    provideHorizontalAlign: useInjectProp<CPosition>({
      props,
      propName: 'horizontalAlign',
      defaultValue: 'center',
    }),
    provideVerticalAlign: useInjectProp<CPosition>({
      props,
      propName: 'verticalAlign',
      defaultValue: 'center',
    }),
  }
}
