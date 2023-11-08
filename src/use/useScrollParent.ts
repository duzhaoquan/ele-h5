import { onMounted, ref, type Ref } from 'vue'

type ScrollElement = Element | Window
function isElement(node: Element) {
  const ELEMEN_TNODE = 1
  return node.tagName !== 'HTML' && node.tagName !== 'BODT' && node.nodeType === ELEMEN_TNODE
}

function getScrollParent(el: Element, root: ScrollElement) {
  //正则
  const overflowScrollReg = /scroll|auto|overlay/i
  let node = el
  while (node && node !== root && isElement(node)) {
    const overflowY = window.getComputedStyle(node).overflowY
    if (overflowScrollReg.test(overflowY)) {
      return node
    }
    node = node.parentElement as Element
  }
  return root
}

export function useScrollParent(el: Ref<Element>, root: ScrollElement = window) {
  const srcollParent = ref()
  onMounted(() => {
    if (el.value) {
      srcollParent.value = getScrollParent(el.value, root)
    }
  })
  return srcollParent
}
