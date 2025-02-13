export function resPromise(){
  return Promise.resolve('ok')
}

export function rejectPromise(){
  return Promise.reject('reject')
}

export async function asyncPromise(){
  return 'ok'
}

export async function noAsyncPromise(){
  throw 'no'
}