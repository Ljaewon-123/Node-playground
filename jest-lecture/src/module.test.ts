import { obj } from "./module"

// 모듈 리셋
beforeEach(() => {
  jest.resetModules()
})

jest.mock('./module')
test('all module mocking', () => {
  console.log(obj)  // 전부 모킹됨 
})