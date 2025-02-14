it('+++', () => {
  expect(1+1).toBe(3)
})
it('+++', () => {
  expect(1+1).toBe(3)
})
it('+++', () => {
  expect(1+1).toBe(3)
})

// 객체도 가능 
it.each([
  [1,2,3],
  [2,3,5],
  [3,4,7],
])('%i 더하기 %i = %i', (a, b, c) => {
  expect(a + b).toBe(c)
})