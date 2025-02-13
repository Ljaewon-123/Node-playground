// import { resPromise, rejectPromise, asyncPromise, noAsyncPromise  } from "./asyncFunction"
import * as fns from "./asyncFunction"

// resolves 사용시 return있어야 기다림
// promise로 테스트시 return필수 

test('resPromise test add', () => {
  jest.spyOn(fns, 'resPromise').mockResolvedValue('ok')
  return expect(fns.resPromise).resolves.toBe('ok')
})

test('resPromise test', () => {
  const spy = jest.fn(fns.resPromise)
  return expect(spy()).resolves.toBe('ok')
})

test('resPromise test2', () => {
  const spy = jest.fn(fns.resPromise)
  return spy().then(res => {
    expect(res).toBe('ok')
  })
})

test('rejectPromise test', () => {
  const spy = jest.fn(fns.rejectPromise)
  return spy().catch(res => {
    expect(res).toBe('no')
  })
})

test('rejectPromise test2', () => {
  const spy = jest.fn(fns.rejectPromise)
  return expect(spy()).rejects.toBe('no')
})

// ##########
// async await에는 return문 필요없다.
// async도 위처럼 test가능하다.
// ##########

test('async resPromise test3', async () => {
  const spy = jest.fn(fns.asyncPromise)
  const result = await spy()
  expect(result).toBe('ok')
})

test('async rejectPromise test3', async () => {
  const spy = jest.fn(fns.noAsyncPromise)
  try {
    const result = await spy()
  } catch (error) {
    expect(error).toBe('no')
  }
})