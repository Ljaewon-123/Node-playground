import { CustomError, customError, error } from "./throwFunction"

// throw자체가 test되기전에 에러를 throw하기 때문에 한번 wrap해줘야함
test('good error', () => {
  expect(() => error()).toThrow(Error);
  expect(() => customError()).toThrow(CustomError);
})

test('try catch test', () => {
  try {
    error()
  } catch (err) {
    // 에러객체 끼리 비교해야함 
    expect(err).toStrictEqual(new Error())
  }
})