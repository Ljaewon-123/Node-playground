import { sum, obj } from "./toHaveBeenCalled"

// 일반객체 비교 
// toHaveBeenCalled의마가 없는경우가 많다.
test('Called sum function', () => {
  // js내부적으로 콜을 카운트해주지 않으니까 이런 기능을 jset에서제공
  // 이런 함수들을 spy함수라고한다.
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2)
  expect(sumSpy).toHaveBeenCalled()
})

// 호출여부보다 몇번 호출되었느냐가 중요
test('Called sum 1', () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2)
  expect(sumSpy).toHaveBeenCalledTimes(1)
})

// 인수도 같이 체크 제대로된 인수로 체크
test('Called sum function with (1, 2)', () => {
  const sumSpy = jest.fn(sum);
  sumSpy(1, 2)

  expect(sumSpy).toHaveBeenCalledWith(1, 2)
})

test('spy fn obj.minus called 1', () => {
  const minusSpy = jest.fn(obj.minus);
  minusSpy(1, 2)

  expect(minusSpy).toHaveBeenCalledTimes(1)
})

test('spy on obj.minus called 1', () => {
  const minusSpy = jest.spyOn(obj, 'minus');
  const result = obj.minus(1, 2)

  expect(minusSpy).toHaveBeenCalledTimes(1)
  expect(result).toBe(-1)
})


