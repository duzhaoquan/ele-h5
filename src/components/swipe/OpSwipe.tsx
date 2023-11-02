import { useChildren, type Child, type NotNullChild } from '@/use/useChildren'
import { doubleRaf } from '@/utils/raf'
import { clamp, createNamespace } from 'vant/lib/utils'
import { ref, defineComponent, computed, reactive, onMounted, onBeforeUnmount, Ref } from 'vue'
import './OpSwipe.scss'
import OpSwipeItem from './OpSwipeItem'
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
    autoplay: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 1000,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    showIndicators: {
      type: Boolean,
      default: true,
    },
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
    const getTargetOffset = (active: number, offset: number) => {
      const position = active * size.value
      const targetOffset = offset - position
      return targetOffset
    }
    const minOffset = computed(() => {
      if (state.rect) {
        const base = props.vertical ? state.rect.height : state.rect.width
        return base - trackSize.value
      }
      return 0
    })
    const move = ({ pace = 0, offset = 0 }) => {
      if (count.value > 1) {
        const targetActive = getTargetActive(pace)
        const targetOffset = getTargetOffset(targetActive, offset)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars

        if (props.loop) {
          if (targetOffset !== minOffset.value) {
            const outRightBound = targetOffset < minOffset.value
            if (props.vertical) {
              if (outRightBound) {
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
    const touch = useTouch()
    const delta = computed(() => (props.vertical ? touch.deltaY.value : touch.deltaX.value))
    let touchStartTime: number
    const onTouchStart = (evevt: TouchEvent) => {
      touch.start(evevt)
      touchStartTime = Date.now()

      stopAutoplay()
      correctPositon()
    }
    const onTouchMove = (event: TouchEvent) => {
      touch.move(event)

      event.preventDefault()
      move({ offset: delta.value })
    }
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
      </div>
    )
  },
})
