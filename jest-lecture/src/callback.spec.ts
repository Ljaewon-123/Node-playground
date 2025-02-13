import { timer } from './callback'

// cb test시 내장 done으로 test가능함 
test('timer good job?', (done) => {
  timer((message: string) => {
    expect(message).toBe('failure')
    done()
  })
})