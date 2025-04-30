import { ok } from './fallback-result'
// express같은 프레임 워크일 필요는 없는거 같은데? 


export const handler = async (event: any) => {

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!')
  }

  return ok(response)
}