import { test, describe, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
const onVisibleChange = vi.fn()

vi.mock('@popperjs/core')

describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('Tooltip.vue', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside"></div>
          <Tooltip content="hello Tooltip" trigger="click" onVisible-change={onVisibleChange}>
            <button id="trigger">Trigger</button>
          </Tooltip>
        </div>
      ),
      {
        attachTo: document.body,
      },
    )

    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBe(true)
    expect(wrapper.find('.pp-tooltip__popper').exists()).toBeFalsy()
    triggerArea.trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.pp-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.find('.pp-tooltip__popper').text()).toBe('hello Tooltip')
    expect(onVisibleChange).toHaveBeenCalledWith(true)

    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.pp-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
    console.log(wrapper.html())
  })
})
