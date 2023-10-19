import { getCurrentInstance } from 'vue'

export function useExpose<T = Record<string, any>>(aps: T) {
  Object.assign(getCurrentInstance, aps)
}
