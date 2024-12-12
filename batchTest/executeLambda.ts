import {
  LambdaClient,
  InvokeCommand,
  InvokeCommandInput
} from "@aws-sdk/client-lambda";
import { TextDecoder } from "util";
import * as fs from "fs";

export async function invokeLambda(lambdaName: string, payload: any): Promise<any> {
  const lambda = new LambdaClient({
    region: process.env.AWS_REGION || "us-east-1"
  });
  const params = {
    FunctionName: lambdaName,
    Payload: JSON.stringify(payload),
    InvocationType: "RequestResponse",
    LogType: "None",
  } as InvokeCommandInput;
  const command = new InvokeCommand(params);
  try {
    let response = await lambda.send(command);
    let payloadString = new TextDecoder().decode(response.Payload);

    try {
      return JSON.parse(payloadString)
    } catch (err) {
      console.log("Error parsing JSON", err)
      return payloadString
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Destination lambda was not found: " + lambdaName }, null, 2)
    }
  }
}


if (require.main === module) {
  (async () => {
    if (true) {

      let minRam = 256
      let ramStep = 256
      let maxRam = 10240

      let jsonResults = {} as { [key: string]: any }

      let nPerFunction = {
        pi: 100000000,
        fibonacci: 40,
        integration: 1000000000,
        matrix: 1000,
        prime: 10000000
      }

      type BenchmarkPayload = {
        functionName: string,
        ram: number,
        n: number,
        time?: number,
        cpus: any[]
      }

      async function processBenchmark(size: number, functionName: string) {
        try {
          console.log("Processing", functionName, size)
          let invokationResult = await invokeLambda(`benchmark-dev-memory${size}ram`, { functionName, n: nPerFunction[functionName], ram: size }) as BenchmarkPayload
          fs.writeFileSync(`results/invokationResult-${functionName}-${size}.json`, JSON.stringify(invokationResult, null, 2))
          console.log("Completed", `${invokationResult.functionName},${invokationResult.ram},${invokationResult.n},${invokationResult.time}`)
          jsonResults[invokationResult.ram] = jsonResults[invokationResult.ram] || {}
          jsonResults[invokationResult.ram]["cpuCount"] = invokationResult.cpus?.length || 1
          jsonResults[invokationResult.ram]["cpuSpeed"] = invokationResult.cpus[0].speed || 1
          jsonResults[invokationResult.ram]["cpuModel"] = invokationResult.cpus[0].model || ""
          jsonResults[invokationResult.ram][invokationResult.functionName] = invokationResult.time
        } catch(err) {
          console.log("⭕️ invokationResult error", err)
        }
      }

      let promisesWaiting = [] as Promise<any>[]
      for (let functionName in nPerFunction) {

        for (let ramSize = minRam; ramSize <= maxRam; ramSize += ramStep) {
          promisesWaiting.push(processBenchmark(ramSize, functionName))
        }

        // fs.writeFileSync(`results-${functionName}.csv`, results.join("\n"))
      }
      await Promise.all(promisesWaiting)

      let fullCsv = [] as string[]

      fullCsv.push(`RAM,cpuCount,cpuSpeed,cpuModel,${Object.keys(nPerFunction).join(",")}`)

      for (let ramSize = minRam; ramSize <= maxRam; ramSize += ramStep) {
        fullCsv.push(`${ramSize},${jsonResults[ramSize]["cpuCount"]},${jsonResults[ramSize]["cpuSpeed"]},${jsonResults[ramSize]["cpuModel"]},${Object.keys(nPerFunction).map((functionName) => jsonResults[ramSize][functionName]).join(",")}`)
      }

      fs.writeFileSync(`results-full.csv`, fullCsv.join("\n"))
    } else {
      // invokeLambda("benchmark-dev-memory128ram", { functionName: "pi", n: 100000000, ram: 128 }).then(console.log);
      // invokeLambda("benchmark-dev-memory9216ram", { functionName: "pi", n: 100000000, ram: 9216 }).then(console.log);
      // invokeLambda("benchmark-dev-memory128ram", { functionName: "fibonacci", n: 40, ram: 128 }).then(console.log);
      // invokeLambda("benchmark-dev-memory9216ram", { functionName: "fibonacci", n: 40, ram: 9216 }).then(console.log);
      // invokeLambda("benchmark-dev-memory128ram", { functionName: "integration", n: 1000000000, ram: 128 }).then(console.log);
      // invokeLambda("benchmark-dev-memory9216ram", { functionName: "integration", n: 1000000000, ram: 9216 }).then(console.log);
      // invokeLambda("benchmark-dev-memory128ram", { functionName: "matrix", n: 1000, ram: 128 }).then(console.log);
      // invokeLambda("benchmark-dev-memory9216ram", { functionName: "matrix", n: 1000, ram: 9216 }).then(console.log);
      // invokeLambda("benchmark-dev-memory128ram", { functionName: "prime", n: 10000000, ram: 128 }).then(console.log);
      // invokeLambda("benchmark-dev-memory9216ram", { functionName: "prime", n: 10000000, ram: 9216 }).then(console.log);
    }

  })()
}