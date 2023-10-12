import { onUnmounted } from 'vue'

//定时器函数
export function useInterval(fn: () => void, time: number) {
  const timer = setInterval(fn, time)
  const clear = () => {
    clearInterval(timer)
  }
  onUnmounted(clear)
  return clear
}
