import { computed, defineComponent, renderSlot, h, PropType } from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import { inputLight } from '../styles'
import type { InputTheme } from '../styles'
import style from './styles/input-group-label.cssr'
import type { Size } from './interface'

export default defineComponent({
  name: 'InputGroupLabel',
  props: {
    ...(useTheme.props as ThemeProps<InputTheme>),
    size: {
      type: String as PropType<Size>,
      default: 'medium'
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Input',
      'InputGroupLabel',
      style,
      inputLight,
      props
    )
    return {
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            groupLabelColor,
            borderRadius,
            textColor,
            lineHeight,
            border,
            [createKey('fontSize', size)]: fontSize,
            [createKey('height', size)]: height
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--group-label-color': groupLabelColor,
          '--border': border,
          '--border-radius': borderRadius,
          '--text-color': textColor,
          '--font-size': fontSize,
          '--line-height': lineHeight,
          '--height': height
        }
      })
    }
  },
  render () {
    return (
      <div class="n-input-group-label" style={this.cssVars as any}>
        {renderSlot(this.$slots, 'default')}
        <div class="n-input-group-label__border" />
      </div>
    )
  }
})