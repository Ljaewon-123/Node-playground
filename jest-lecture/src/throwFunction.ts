export function error() {
  throw Error('hi')
}

export class CustomError extends Error {}
export function customError() {
  throw new CustomError()
}
