import { ref, watch, type Ref, type UnwrapRef, onUnmounted } from 'vue'

// interface IDeBounceFn<T> {
//   (...args: T[]): void | Promise<T>
// }

// export function useDebounce<T>(fn: IDeBounceFn<T>, delay: number) {
//   let timer: number | null = null
//   return function f(this: void, ...args: []) {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.call(this, ...args)
//     }, delay)
//   }
// }

export function useDebounce<T>(value: Ref<T>, delay: number) {
  const debounceValue = ref(value.value)
  let timer: number | null = null
  const unwatch = watch(value, (nv) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      debounceValue.value = nv as UnwrapRef<T>
    }, delay)
  })

  onUnmounted(() => {
    unwatch()
  })
  return debounceValue
}
