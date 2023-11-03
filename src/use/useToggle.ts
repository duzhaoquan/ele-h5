import { ref } from 'vue'
import type { Ref } from 'vue'
//kaiguan 开关
export function useToggle(initState: boolean): [Ref<boolean>, () => void] {
  const state = ref(initState)
  const toggle = function () {
    const newValue = !state.value
    state.value = newValue
  }
  return [state, toggle]
}
