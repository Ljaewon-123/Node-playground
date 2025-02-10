import { obj } from "./toMatchOjbect"

// 객체명이 다를때 
test('obj method', () => {
  expect(obj('hello')).toMatchObject({a: 'hello'})
})