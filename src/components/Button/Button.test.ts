import { test, describe, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

describe('Button', () => {
  test('basic button', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button text'
      }
    })
    expect(wrapper.classes()).toContain('pp-button--primary')
    expect(wrapper.text()).toEqual('button text')
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disabled button', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        disabled: true
      },
      slots: {
        default: 'disabled text'
      }
    })
    // 测试是否点击
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.text()).toEqual('disabled text')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon button', async () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon text'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')

  })

  test('loading button', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading text'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')

    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
})