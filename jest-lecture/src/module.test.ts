import { obj } from "./module"

jest.mock('./module')
test('all module mocking', () => {
  console.log(obj)  // 전부 모킹됨 
})