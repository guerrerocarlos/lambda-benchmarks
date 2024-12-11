import {
  LambdaClient,
  InvokeCommand,
  InvokeCommandInput
} from "@aws-sdk/client-lambda";
import { TextDecoder } from "util";

export async function invokeLambda(lambdaName: string, payload: any) {
  const lambda = new LambdaClient({
    region: process.env.AWS_REGION || "us-east-1"
  });
  const params = {
    FunctionName: lambdaName,
    Payload: JSON.stringify(payload),
    // InvocationType: "Event",
    InvocationType: "RequestResponse",
    LogType: "None",
  } as InvokeCommandInput;
  // console.log("INVOKING...", params);
  const command = new InvokeCommand(params);
  // console.log("INVOKED")
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
      body: JSON.stringify({ error: "Destination container was not found: " + lambdaName }, null, 2)
    }
  }
}

if (require.main === module) {
  // invokeLambda("benchmark-dev-memory128ram", { functionName: "pi", n: 100000000, ram: 128 }).then(console.log);
  // invokeLambda("benchmark-dev-memory9216ram", { functionName: "pi", n: 100000000, ram: 9216 }).then(console.log);
  // invokeLambda("benchmark-dev-memory128ram", { functionName: "fibonacci", n: 40, ram: 128 }).then(console.log);
  // invokeLambda("benchmark-dev-memory9216ram", { functionName: "fibonacci", n: 40, ram: 9216 }).then(console.log);
  // invokeLambda("benchmark-dev-memory128ram", { functionName: "integration", n: 1000000000, ram: 128 }).then(console.log);
  // invokeLambda("benchmark-dev-memory9216ram", { functionName: "integration", n: 1000000000, ram: 9216 }).then(console.log);
  invokeLambda("benchmark-dev-memory128ram", { functionName: "matrix", n: 1000, ram: 128 }).then(console.log);
  invokeLambda("benchmark-dev-memory9216ram", { functionName: "matrix", n: 1000, ram: 9216 }).then(console.log);
}