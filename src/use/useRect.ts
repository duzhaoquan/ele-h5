import { unref, type Ref } from 'vue'

function makeDOMRect(width: number, height: number) {
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width: width,
    height: height,
  }
}
export function useRect(elementOrRef: Element | Window | Ref<Element | Window>) {
  const element = unref(elementOrRef)
  if (element === window) {
    return makeDOMRect(innerWidth, innerHeight)
  }
  if ((element as Element).getBoundingClientRect) {
    return (element as Element).getBoundingClientRect()
  }
  return makeDOMRect(0, 0)
}
