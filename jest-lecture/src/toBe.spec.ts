import { sum } from './toBe';

test('sum method', () => {
  expect(sum(1, 2)).toBe(3)
  expect(sum(1, 2)).not.toBe(3)
})


// npx jest