import { Context } from 'aws-lambda'
import calculations from './calculations'
import os from "os"

type BenchmarkPayload = {
  functionName: string
  n: number
}
export async function handler(event: any, context?: Context) {
  console.log(`🚀`, JSON.stringify(event, null, 2))
  let initTime = new Date().getTime()
  try {
    return {
      ...event,
      cpus: os.cpus(),
      result: await calculations[event.functionName || "matrix"](event.n),
      time: new Date().getTime() - initTime
    }
  } catch (err) {
    return {
      ...event,
      cpus: os.cpus(),
      error: err,
      time: new Date().getTime() - initTime
    }
  }
}

if(require.main === module) {
  handler({ functionName: "pi", n: 100000000, ram: 9216 }).then((res) => console.log(JSON.stringify(res, null, 2)))
}