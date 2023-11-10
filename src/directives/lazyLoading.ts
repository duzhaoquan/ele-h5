import type { App, DirectiveBinding } from 'vue'

const vLazy = (observer: IntersectionObserver) => {
  return {
    beforeMount: (el: HTMLImageElement, binding: DirectiveBinding) => {
      el.classList.add('op-lazyloading')
      el.dataset.lazyKey = binding.value
      observer.observe(el)
    },
  }
}

const lazyPlugin = {
  install(app: App) {
    const observer = new IntersectionObserver(
      (entries) => {
        //被观察者集合
        entries.forEach((item) => {
          //要触发的事件
          if (item.isIntersecting) {
            const el = item.target as HTMLImageElement
            el.src = el.dataset.lazyKey as string
            el.classList.remove('lazyloading')

            observer.unobserve(el)
          }
        })
      },
      {
        // 交叉视图的 100ps，才开始派发事件
        rootMargin: '0px 0px -100px 0px',
      },
    )
    //添加一个名字叫lazy的指令 eg: <img v-lazy="" />
    app.directive('lazy', vLazy(observer))
  },
}

export default lazyPlugin
