import { after3days } from "./date"

test('3일후', () => {
  jest.useFakeTimers().setSystemTime(new Date(2024, 3, 9))
  console.log(new Date())
  expect(after3days()).toStrictEqual(new Date(2024, 3, 12))
  jest.useRealTimers() // 없으면 계속 fake time임
})

afterEach(() => {
  jest.useRealTimers()
})

// 문서 참고 
// runAll~ 10초기다리는거 바로 해결해버릴수있음 등등 기능이 많다.
