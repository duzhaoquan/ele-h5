import type { InjectionKey } from 'vue'
import type { Child } from './useChildren'
import { inject, getCurrentInstance, onUnmounted } from 'vue'

export type ParentProvide = {
  link(instance: Child): void
  unlink(instance: Child): void
  [key: string]: any
}

export function useParent(key: InjectionKey<ParentProvide>) {
  //为子组件注入父组件提供的属性
  const parent = inject(key, null)

  if (!parent) {
    return {
      parent: null,
    }
  }
  //当前的子组件 加入到数组中
  const instance = getCurrentInstance()
  const { link, unlink } = parent
  link(instance)
  //生命周期结束时 从数组中移除，防止内存泄漏
  onUnmounted(() => unlink(instance))

  return {
    parent,
  }
}
