import { ref } from 'vue'

interface IEnterItem {
  isShow: boolean
  el: HTMLElement
}

export function useTransition(count = 10) {
  //多个item是为了防止一个动画还没完成接着点击
  const createItems = (_count: number) => {
    const result = [] as IEnterItem[]
    for (let i = 0; i < _count; i++) {
      result.push({
        isShow: false,
        el: {} as HTMLElement,
      })
    }
    return result
  }
  const items = ref(createItems(count))
  const enteredItems = [] as IEnterItem[]
  const start = (el: HTMLElement) => {
    const item = items.value.find((v) => !v.isShow)
    if (item) {
      item.isShow = true
      item.el = el
      enteredItems.push(item)
    }
  }
  //位置移动到点击的加号处
  const beforeEnter = (el: Element) => {
    const item = enteredItems[enteredItems.length - 1]
    const rect = item.el.getBoundingClientRect()
    const x = rect.left - 32
    const y = -(window.innerHeight - rect.top)
    ;(el as HTMLElement).style.display = ''
    ;(el as HTMLElement).style.transform = `translate3d(0,${y}px, 0)`
    const inner = el.getElementsByClassName('inner')[0] as HTMLElement
    if (inner) {
      inner.style.transform = `translate3d(${x}px, 0, 0)`
    }
  }
  const enter = (el: Element, done: () => void) => {
    el.addEventListener('transitionend', done)
    setTimeout(() => {
      ;(el as HTMLElement).style.transform = `translate3d(0,0,0)`
      const inner = el.getElementsByClassName('inner')[0] as HTMLElement
      if (inner) {
        inner.style.transform = `translate3d(0, 0, 0)`
      }
    })
  }
  const afterEnter = (el: Element) => {
    const item = enteredItems.shift()
    if (item) {
      item.isShow = false
      item.el = {} as HTMLElement
      ;(el as HTMLElement).style.display = 'none'
    }
  }
  return {
    items,
    start,
    beforeEnter,
    enter,
    afterEnter,
  }
}
