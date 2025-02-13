import { sum, obj } from "./mockFuncton"

// 실제로 내부동작은 안하대 호출되었는지는 알고싶다. 

let minusSpy = jest.spyOn(obj, 'minus')

describe('some description', () => {
  // ##### 각 훅을 개별로 실행가능

  beforeAll(() => { console.log('준비사항 eX) db, 서버 연결') })

  // 각 test전 
  beforeEach(() => {
    console.log('각 test전')
  })

  // 매번 실행 후에 
  afterEach(() => {
    console.log('각 test후')
    // minusSpy.mockRestore();

    // 위와같은 스코프 신경안쓰게 
    // jest.clearAllMocks()
    // jest.resetAllMocks()
    jest.restoreAllMocks();
  })

  // 마지막 
  afterAll(() => { console.log('모든 test종료 후') })

  test('some tests123 ~~', () => {

  })
})

test('obj.minus에 스파이를 심고 실행도 안함', () => {
  minusSpy = jest.spyOn(obj, 'minus').mockImplementation();
  const result = obj.minus(1, 2)
  // console.log(obj.minus)
  expect(minusSpy).toHaveBeenCalledTimes(1)
  expect(result).not.toBe(-1)

  // 파일전체에서 유지되는 스파이 클리어 
  // minusSpy.mockClear() //
})

// 급할때 test통과시킴 
test.skip('1111', () => {
  
})

test.todo('나중에 만들어야지 ')


test('obj.minus에 스파이를 심고 return은 바꿈', () => {
  // const minusSpy = jest.spyOn(obj, 'minus').mockImplementation(() => 5);
  minusSpy = jest.spyOn(obj, 'minus').mockImplementation((a, b) => a + b);
  const result = obj.minus(1, 2)
  // console.log(obj.minus) 
  expect(minusSpy).toHaveBeenCalledTimes(1)
  expect(result).toBe(3)
  // minusSpy.mockClear()
})


test('obj.minus에 스파이를 심고 한번만 가짜 행동 ', () => {
  minusSpy = jest.spyOn(obj, 'minus')
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5)
    .mockImplementation(() => 3)
  const result1 = obj.minus(1, 2)
  const result2 = obj.minus(1, 2)
  const result3 = obj.minus(1, 2)
  expect(minusSpy).toHaveBeenCalledTimes(1)
  expect(result1).toBe(3)
  expect(result2).toBe(5)
  expect(result3).toBe(-1)

  // ###
  // minusSpy.mockClear()  // times, with 초기화
  // minusSpy.mockReset() // mockCloear _ mockImplementation(() => {})
  // minusSpy.mockRestore() // 아예 전부 없애버림 
})

test('obj.minus에 스파이를 심고 리턴 다름 (mockReturnValue) ', () => {
  minusSpy = jest.spyOn(obj, 'minus')
    .mockReturnValue(5) // 항상 5만 리턴 
  const result1 = obj.minus(1, 2)
  expect(minusSpy).toHaveBeenCalledTimes(1)
  expect(result1).toBe(5)
  // minusSpy.mockClear()
})

test('obj.minus에 스파이를 심고 리턴 다름 (mockReturnValueOnce) ', () => {
  minusSpy = jest.spyOn(obj, 'minus')
    .mockReturnValueOnce(5) 
    .mockReturnValueOnce(3) 
    .mockReturnValue(8) 
  const result1 = obj.minus(1, 2)
  expect(minusSpy).toHaveBeenCalledTimes(1)
  expect(result1).toBe(5)
  expect(result1).toBe(3)
  expect(result1).toBe(8)
  // minusSpy.mockClear()
})


// 아래 훅 순서로 시작 

// 모든 test실행전 
beforeAll(() => { console.log('준비사항 eX) db, 서버 연결') })

// 각 test전 
beforeEach(() => {
  console.log('각 test전')
})

// 매번 실행 후에 
afterEach(() => {
  console.log('각 test후')
  // minusSpy.mockRestore();

  // 위와같은 스코프 신경안쓰게 
  // jest.clearAllMocks()
  // jest.resetAllMocks()
  jest.restoreAllMocks();
})

// 마지막 
afterAll(() => { console.log('모든 test종료 후') })