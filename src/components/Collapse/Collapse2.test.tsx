import { test, describe, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import Item from './CollapseItem.vue'

describe('Collapse', () => {
  test('Collapse.vue', async () => {
    const onChange = vi.fn()
    const wrapper = mount(() => 
      <Collapse modelValue={['a']} accordion onChange={onChange}>
        <Item name="a" title="title a">
          <div>content content content</div>
        </Item>
        <Item name="b" title="title b">
          <div>content111 content content</div>
        </Item>
        <Item name="c" title="title c" disabled>
          <div>content111222 content content</div>
        </Item>
      </Collapse>
    , {
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })
    // 测试Item的个数
    const headers = wrapper.findAll('.pp-collapse-item__header')
    const contents = wrapper.findAll('.pp-collapse-item__wrapper')
    
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    const firstHeader = headers[0]
    const secondHeader = headers[1]
    const disabledHeader = headers[2]
    expect(firstHeader.text()).toBe('title a')
    
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content content content')

    // 行为
    await secondHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeTruthy()
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()

    expect(onChange).toHaveBeenCalledWith(['b'])
    expect(onChange).toHaveBeenLastCalledWith(['a'])

    // disable
    await disabledHeader.trigger('click')
    expect(disabledHeader.classes()).toContain('is-disabled')
    expect(disabledContent.isVisible()).toBeFalsy()

  })
 
})