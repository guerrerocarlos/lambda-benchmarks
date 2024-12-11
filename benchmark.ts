import { Context } from 'aws-lambda'
import calculations from './calculations'
import { error } from 'console'

type BenchmarkPayload = {
  functionName: string
  n: number
}
export async function handler(event: any, context: Context) {
  console.log(`🚀`, JSON.stringify(event, null, 2))
  let initTime = new Date().getTime()
  try {
    return {
      ...event,
      result: await calculations[event.functionName || "matrix"](event.n),
      time: new Date().getTime() - initTime
    }
  } catch (err) {
    return {
      ...event,
      error: err,
      time: new Date().getTime() - initTime
    }
  }
}