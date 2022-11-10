import type { Directive } from 'vue'

const vDrag: Directive = {
  beforeMount: (el) => {
    el._casualDragContext = {
      previous: {},
    }
    el.setAttribute('draggable', '')
    // TODO: implement the rest
    el.addEventListener('dragstart', (_e: any) => {
    })
    el.addEventListener('drag', (_e: any) => {
    })
    el.addEventListener('dragend', (_e: any) => {
    })
  },
}

export default vDrag
