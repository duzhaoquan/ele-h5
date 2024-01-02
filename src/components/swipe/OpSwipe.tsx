import { useChildren } from '@/use/useChildren'
import { doubleRaf } from '@/utils/raf'
import { clamp, createNamespace } from 'vant/lib/utils'
import { ref, defineComponent, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import './OpSwipe.scss'
//import OpSwipeItem from './OpSwipeItem'
import { useTouch } from '@/use/useTouch'

const [name, bem] = createNamespace('swipe')

export const SWIPE_KEY = Symbol('swipe')

export type SwipeState = {
  rect: { width: number; height: number } | null
  width: number
  height: number
  offset: number
  active: number
  swiping: boolean
}

export default defineComponent({
  name,
  props: {
    //是否自动播放
    autoplay: {
      type: Number,
      default: 0,
    },
    //时间间隔
    duration: {
      type: Number,
      default: 1000,
    },
    //是否循环播放
    loop: {
      type: Boolean,
      default: true,
    },
    //是否展示页码
    showIndicators: {
      type: Boolean,
      default: true,
    },
    //方向 水平还是数值方向
    vertical: {
      type: Boolean,
      defalut: false,
    },
  },
  setup(props, { slots }) {
    const root = ref()
    const track = ref()
    const state = reactive<SwipeState>({
      rect: null,
      offset: 0,
      width: 0,
      height: 0,
      active: 0,
      swiping: false,
    })

    const { children, linkChildren } = useChildren(SWIPE_KEY)
    const count = computed(() => children.length)
    const size = computed(() => state[props.vertical ? 'height' : 'width'])
    const trackSize = computed(() => count.value * size.value)
    const firstChild = computed(() => track.value.children[0])
    const lastChild = computed(() => track.value.children[count.value - 1])
    const trackStyle = computed(() => {
      const mainAxis = props.vertical ? 'height' : 'width'
      const style = {
        transform: `translate${props.vertical ? 'Y' : 'X'}(${state.offset}px)`,
        transitionDuration: `${state.swiping ? 0 : props.duration}ms`,
        [mainAxis]: `${trackSize.value}px`,
      }
      return style
    })

    //获取下一页对应页码，pace移动几页
    const getTargetActive = (pace: number) => {
      const active = state.active
      if (pace) {
        if (props.loop) {
          return clamp(active + pace, -1, count.value)
        } else {
          return clamp(active + pace, 0, count.value - 1)
        }
      }
      return active
    }
    //获取下一页对应的偏移距离
    const getTargetOffset = (active: number, offset: number) => {
      const position = active * size.value
      const targetOffset = offset - position
      return targetOffset
    }
    //最小偏移距离
    const minOffset = computed(() => {
      if (state.rect) {
        const base = props.vertical ? state.rect.height : state.rect.width
        return base - trackSize.value
      }
      return 0
    })
    //移动到下一页
    const move = ({ pace = 0, offset = 0 }) => {
      if (count.value > 1) {
        const targetActive = getTargetActive(pace)
        const targetOffset = getTargetOffset(targetActive, offset)

        if (props.loop) {
          if (targetOffset !== minOffset.value) {
            //再移动就右边出现空白了即最后一页了
            const outRightBound = targetOffset < minOffset.value
            if (props.vertical) {
              if (outRightBound) {
                //到最后一页时把第一页拼接到后边，形成循环
                firstChild.value.style.transform = `translateY(${trackSize.value}px)`
              } else {
                firstChild.value.style.transform = `translateY(0px)`
              }
            } else {
              if (outRightBound) {
                firstChild.value.style.transform = `translateX(${trackSize.value}px)`
              } else {
                firstChild.value.style.transform = `translateX(0px)`
              }
            }
          }
          if (targetOffset !== 0) {
            const outLeftBound = targetOffset > 0
            if (props.vertical) {
              if (outLeftBound) {
                lastChild.value.style.transform = `translateY(${-trackSize.value}px)`
              } else {
                lastChild.value.style.transform = `translateY(0px)`
              }
            } else {
              if (outLeftBound) {
                lastChild.value.style.transform = `translateX(${-trackSize.value}px)`
              } else {
                lastChild.value.style.transform = `translateX(0px)`
              }
            }
          }
        }

        state.active = targetActive
        state.offset = targetOffset //改变offset触发滚动
      }
    }
    const correctPositon = () => {
      state.swiping = true
      //如果超出页码范围返回首页初始位置，形成循环播放
      if (state.active < 0) {
        move({ pace: count.value })
      } else if (state.active >= count.value) {
        move({ pace: -count.value })
      }
    }

    const next = () => {
      correctPositon()
      doubleRaf(() => {
        state.swiping = false
        move({ pace: 1 })
      })
    }

    let timer: number
    const stopAutoplay = () => {
      clearTimeout(timer)
    }
    const autoplay = () => {
      stopAutoplay()
      if (props.autoplay > 0 && count.value > 1) {
        timer = setTimeout(() => {
          next()
          autoplay()
        }, props.autoplay)
      }
    }
    const init = () => {
      if (!root.value) {
        return
      }
      const rect = {
        width: root.value?.offsetWidth,
        height: root.value?.offsetHeight,
      }
      state.rect = rect
      state.width = rect.width
      state.height = rect.height
      autoplay()
    }
    //对滑动手势的一些处理，主要是获取滑动距离位置等的封装
    const touch = useTouch()
    const delta = computed(() => (props.vertical ? touch.deltaY.value : touch.deltaX.value))
    let touchStartTime: number
    const onTouchStart = (evevt: TouchEvent) => {
      touch.start(evevt)
      touchStartTime = Date.now()
      //停止制动播放
      stopAutoplay()
      correctPositon()
    }
    //触发手势滑动
    const onTouchMove = (event: TouchEvent) => {
      touch.move(event)

      event.preventDefault()
      move({ offset: delta.value })
    }
    //手势滑动结束时决定是否滚到下一下
    const onTouchEnd = () => {
      const duration = Date.now() - touchStartTime
      const speed = delta.value / duration
      const shouldSwipe = Math.abs(speed) > 0.25 || Math.abs(delta.value) > size.value / 2
      if (shouldSwipe) {
        const offset = props.vertical ? touch.offsetY.value : touch.offsetX.value
        let pace = 0
        if (props.loop) {
          pace = offset > 0 ? (delta.value > 0 ? -1 : 1) : 0
        } else {
          pace = -Math[delta.value > 0 ? 'ceil' : 'floor'](delta.value / size.value)
        }
        move({ pace: pace })
      } else {
        move({ pace: 0 })
      }

      state.swiping = false
      autoplay()
    }
    //页码
    const activeIndicator = computed(() => state.active % count.value)
    const renderDot = (_: string, index: number) => {
      const active = index === activeIndicator.value
      return <i class={bem('indicator', { active })}> </i>
    }
    const renderIndicator = () => {
      if (props.showIndicators) {
        return <div class={bem('indicators')}>{Array(count.value).fill('').map(renderDot)}</div>
      }
    }

    linkChildren({
      size,
      props,
    })
    onMounted(init)
    onBeforeUnmount(stopAutoplay)
    return () => (
      <div ref={root} class={bem()}>
        <div
          ref={track}
          style={trackStyle.value}
          class={bem('track')}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
        >
          {slots.default?.()}
        </div>
        {renderIndicator()}
      </div>
    )
  },
})
