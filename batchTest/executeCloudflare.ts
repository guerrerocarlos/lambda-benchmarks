import * as fs from "fs"

type BenchmarkPayload = {
  functionName: string
  n: number
}

type CloudflareResponse = {
  functionName?: string
  n?: number
  time?: number
  error?: unknown
  cpus?: { count?: number | null } | unknown
  [key: string]: unknown
}

async function invokeWorker(endpoint: string, payload: BenchmarkPayload): Promise<CloudflareResponse | string> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

if (require.main === module) {
  ;(async () => {
    const endpoint = process.env.CF_BENCHMARK_URL || process.argv[2]
    if (!endpoint) {
      console.error("Set CF_BENCHMARK_URL or pass the endpoint as the first argument.")
      process.exit(1)
    }

    const nPerFunction: Record<string, number> = {
      pi: 100000000,
      fibonacci: 40,
      integration: 1000000000,
      matrix: 1000,
      prime: 10000000
    }

    fs.mkdirSync("results", { recursive: true })

    const summary: Record<string, { time?: number; cpuCount?: number | null; error?: unknown }> = {}
    for (const functionName of Object.keys(nPerFunction)) {
      console.log("Processing", functionName)
      const payload = { functionName, n: nPerFunction[functionName] }
      const invocation = await invokeWorker(endpoint, payload)

      fs.writeFileSync(
        `results/cloudflare-${functionName}.json`,
        JSON.stringify(invocation, null, 2)
      )

      if (typeof invocation === "object" && invocation !== null) {
        const cpuCount = (invocation.cpus as { count?: number | null } | undefined)?.count ?? null
        summary[functionName] = {
          time: invocation.time as number | undefined,
          cpuCount,
          error: invocation.error
        }
      } else {
        summary[functionName] = { error: "Non-JSON response" }
      }
    }

    const csvLines = ["functionName,time,cpuCount"]
    for (const functionName of Object.keys(nPerFunction)) {
      const entry = summary[functionName] || {}
      csvLines.push(`${functionName},${entry.time ?? ""},${entry.cpuCount ?? ""}`)
    }

    fs.writeFileSync("results/cloudflare-summary.json", JSON.stringify(summary, null, 2))
    fs.writeFileSync("results/cloudflare-summary.csv", csvLines.join("\n"))
  })()
}
