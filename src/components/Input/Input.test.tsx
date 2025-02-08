import { describe, expect, it } from 'vitest'
import Input from './Input.vue'
import { mount } from '@vue/test-utils'

describe('Input', () => {
  it('基本展示', () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        size: 'large',
        modelValue: '',
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix',
      },
    })

    // check classes
    expect(wrapper.find('.pp-input').classes()).toContain('pp-input--large')
    expect(wrapper.find('.pp-input').classes()).toContain('pp-input--text')
    expect(wrapper.find('.pp-input').classes()).toContain('is-prefix')
    expect(wrapper.find('.pp-input').classes()).toContain('is-prepend')

    // should render input
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('type')).toBe('text')

    // slots
    expect(wrapper.find('.pp-input__prepend').exists()).toBe(true)
    expect(wrapper.find('.pp-input__prefix').exists()).toBe(true)

    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: '',
      },
    })
    expect(wrapper2.find('.pp-textarea__wrapper').exists()).toBe(true)
  })

  it('v-model test', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
      },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('test')

    // 更新值
    await input.setValue('update')
    expect(wrapper.props('modelValue')).toBe('update')
    expect(input.element.value).toBe('update')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual(['update'])
    expect(changeEvent![0]).toEqual(['update'])

    // v-model 异步更新
    await wrapper.setProps({ modelValue: 'test3' })
    expect(input.element.value).toBe('test3')
  })

  it('支持点击清空字符串', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e }),
        clearable: true,
        type: 'text',
      },
      global: {
        stubs: ['Icon'],
      },
    })

    expect(wrapper.find('.pp-input__clear').exists()).toBeFalsy()
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.find('.pp-input__clear').exists()).toBeTruthy()
    await wrapper.find('.pp-input__clear').trigger('click')
    expect(wrapper.props('modelValue')).toBe('')

    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()).toHaveProperty('clear')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })

  it('支持切换密码', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        type: 'text',
        showPassword: true,
      },
      global: {
        stubs: ['Icon'],
      },
    })
    expect(wrapper.find('.pp-input__password').exists()).toBeFalsy()
    const input = wrapper.find('input')
    expect(input.element.type).toBe('password')
    await input.setValue(123)
    const eyeIcon = wrapper.find('.pp-input__password')
    expect(eyeIcon.exists()).toBeTruthy()

    expect(eyeIcon.attributes('icon')).toContain('eye-slash')
    await eyeIcon.trigger('click')
    expect(wrapper.find('.pp-input__password').attributes('icon')).toContain('eye')
    expect(input.element.type).toBe('text')
  })
})
