import { test, expect, describe, vi, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'
vi.mock('axios')
const mockAxios = axios as Mocked<typeof axios>

describe('functions', () => {
  test('create a mock fn', () => {
    const fn = vi.fn()
    testFn(12, fn)
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledWith(12)
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 2
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toBeCalledTimes(2)
  })

  test('mock third party method', async () => {
    mockAxios.get.mockResolvedValue({ data: '222' })
    const data = await request()
    expect(data).toBe('222')
  })
})