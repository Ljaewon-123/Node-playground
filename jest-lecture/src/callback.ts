export function timer(callback: Function) {
  setTimeout(() => {
    callback('success')
  }, 3000)
}