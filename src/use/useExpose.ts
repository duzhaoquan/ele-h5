import { getCurrentInstance } from 'vue'

export function useExpose<T = Record<string, any>>(aps: T) {
  const instance = getCurrentInstance()
  if (instance) {
    Object.assign(instance, aps)
  }
}
