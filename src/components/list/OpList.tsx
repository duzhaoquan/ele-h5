import { createNamespace } from '@/utils/create'
import { defineComponent } from 'vue'

const [name, bem] = createNamespace('list')
export default defineComponent({
  name,
  props: {},
  setup(props, ctx) {
    return <div>List</div>
  },
})
