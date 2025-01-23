import axios from 'axios'

export function testFn(num: number, fn: Function) {
  if(num > 10) {
    fn(num)
  }
}

export async function request() {
  const { data } = await axios.get('fake.url')
  return data
}