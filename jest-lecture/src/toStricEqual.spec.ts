import { obj } from "./toStricEqual"

// 일반객체 비교 
test('객체는 toStrictEqual로', () => {
  expect(obj()).toStrictEqual({ a: 'hello' })
  expect(obj()).not.toBe({ a: 'hello' })
  // expect(obj()).not.toStrictEqual({ a: 'hello' })
})

test('배열끼리도 toStrictEqual 써야한다.', () => {
  expect([1,2,3]).toMatchObject([1,2,3])
  expect([1,2,3]).not.toBe([1,2,3])
})

