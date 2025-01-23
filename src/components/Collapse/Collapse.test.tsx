import { test, describe, expect, vi, beforeAll } from 'vitest'
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import Item from './CollapseItem.vue'

const onChange = vi.fn()
let wrapper: VueWrapper

let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, disabledHeader: DOMWrapper<Element>
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, disabledContent: DOMWrapper<Element>

describe('Collapse', () => {

  beforeAll(() => {
    wrapper = mount(() => 
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

    headers = wrapper.findAll('.pp-collapse-item__header')
    contents = wrapper.findAll('.pp-collapse-item__wrapper')

    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]

    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })

  test('basic', async () => {
    // length
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)
    // text
    expect(firstHeader.text()).toBe('title a')
    // content
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content content content')

  })

  test('trigger', async () => {
    await secondHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    expect(secondContent.isVisible()).toBeTruthy()
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(onChange).toHaveBeenCalledWith(['b'])
    expect(onChange).toHaveBeenLastCalledWith(['a'])
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  test('disabled', async () => {
    // disable
    onChange.mockClear()
    await disabledHeader.trigger('click')
    expect(disabledHeader.classes()).toContain('is-disabled')
    expect(disabledContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
 
})