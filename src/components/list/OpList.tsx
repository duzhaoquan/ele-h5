import { useRect } from '@/use/useRect'
import { useScrollParent } from '@/use/useScrollParent'
import { createNamespace } from '@/utils/create'
import { defineComponent, onMounted, onUpdated, ref } from 'vue'
import { Loading as Vanloading } from 'vant'
import './OpList.scss'

const [name, bem] = createNamespace('list')
export default defineComponent({
  name,
  props: {
    offset: {
      type: Number,
      default: 300,
    },
    direction: {
      type: String,
      default: 'down',
    },
    loading: {
      type: Boolean,
    },
    loadingText: {
      type: String,
    },
    finished: {
      type: Boolean,
    },
    finishedText: {
      type: String,
    },
  },
  setup(props, { slots, emit }) {
    const loading = ref(props.loading)
    const root = ref()
    const placeholder = ref()
    const scrollParent = useScrollParent(root)

    const check = () => {
      if (loading.value || props.finished) {
        return
      }
      const scrollParentRect = useRect(scrollParent)
      if (scrollParentRect.height <= 0) {
        return
      }
      const placeholderRect = useRect(placeholder)

      let isRechEdge = false
      if (props.direction === 'up') {
        isRechEdge = scrollParentRect.top - placeholderRect.top <= props.offset
      } else {
        isRechEdge = placeholderRect.bottom - scrollParentRect.bottom <= props.offset
      }
      if (isRechEdge) {
        loading.value = true
        emit('update:loading', true)
        emit('load')
      }
    }

    onMounted(() => {
      check()
    })
    onUpdated(() => {
      loading.value = props.loading
    })
    const renderLoading = () => {
      if (loading.value && !props.finished) {
        return (
          <div class={bem('loading')}>
            {slots.loading ? (
              slots.loading()
            ) : (
              <Vanloading class={bem('loading-icon')}></Vanloading>
            )}
          </div>
        )
      }
    }
    const renderFinished = () => {
      if (props.finished) {
        const text = slots.finished ? slots.finished() : props.finishedText
        if (text) {
          return <div class={bem('fininshed-text')}>{text}</div>
        }
      }
    }
    return () => {
      const Content = slots.default?.()
      const Placdhoder = <div ref={placeholder} class={bem('placedhoder')}></div>
      return (
        <div class={bem()} ref={root}>
          {props.direction === 'down' ? Content : Placdhoder}
          {renderLoading()}
          {renderFinished()}
          {props.direction === 'up' ? Content : Placdhoder}
        </div>
      )
    }
  },
})
