import { defineComponent } from 'vue'

const RenderVNode = defineComponent({
  name: 'RenderVNode',
  props: {
    vNode: {
      type: [Object, String],
      required: true
    }
  },
  setup(props) {
    return () => props.vNode
  }
})

export default RenderVNode