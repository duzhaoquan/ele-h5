import { defineComponent, type CSSProperties } from 'vue'

const name = 'op-test'
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name,
  setup(props, { slots }) {
    const style: CSSProperties = {}
    style.height = '100px'
    return () => (
      <div class={'hioui'} style={style}>
        {slots.default?.()}
      </div>
    )
  },
})
