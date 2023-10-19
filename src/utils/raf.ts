export const rAF =
  requestAnimationFrame ||
  function (callback) {
    setTimeout(callback, 1000 / 60)
  }
// requestAnimationFrame 屏幕刷新函数，每秒钟刷新60次，版本太低的浏览器没有这个函数，使用 1000 / 60 timout 模拟

export const cancelRaf =
  cancelAnimationFrame ||
  function (id: number) {
    clearTimeout(id)
  }

export const doubleRaf = (fn: () => void) => {
  rAF(() => {
    fn
  })
}
