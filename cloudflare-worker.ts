import calculations from "./calculations"

type BenchmarkPayload = {
  functionName?: string
  n?: number
  [key: string]: unknown
}

function coerceNumeric(value: unknown): unknown {
  if (typeof value !== "string") return value
  const trimmed = value.trim()
  if (trimmed === "") return value
  const parsed = Number(trimmed)
  return Number.isNaN(parsed) ? value : parsed
}

function normalizePayload(payload: Record<string, unknown>): BenchmarkPayload {
  const normalized: Record<string, unknown> = { ...payload }
  if ("n" in normalized) {
    normalized.n = coerceNumeric(normalized.n)
  }
  return normalized as BenchmarkPayload
}

async function parsePayload(request: Request): Promise<BenchmarkPayload> {
  if (request.method === "GET") {
    const params = new URL(request.url).searchParams
    return normalizePayload(Object.fromEntries(params.entries()))
  }

  const contentType = request.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    const parsed = await request.json()
    if (parsed && typeof parsed === "object") {
      return normalizePayload(parsed as Record<string, unknown>)
    }
    return {}
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData()
    return normalizePayload(Object.fromEntries(formData.entries()))
  }

  const text = await request.text()
  if (!text) return {}
  try {
    const parsed = JSON.parse(text)
    if (parsed && typeof parsed === "object") {
      return normalizePayload(parsed as Record<string, unknown>)
    }
  } catch {
    return {}
  }
  return {}
}

function getCpuInfo(): { count: number | null } | null {
  if (typeof navigator === "undefined") return null
  const count = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : null
  return { count }
}

export default {
  async fetch(request: Request): Promise<Response> {
    const initTime = Date.now()
    let payload: BenchmarkPayload = {}
    let parseError: string | null = null

    try {
      payload = await parsePayload(request)
    } catch (err) {
      parseError = err instanceof Error ? err.message : String(err)
    }

    console.log("event", JSON.stringify(payload, null, 2))

    const cpuInfo = getCpuInfo()
    const functionName = (payload.functionName || "matrix") as keyof typeof calculations

    let body: Record<string, unknown>
    if (parseError) {
      body = {
        ...payload,
        cpus: cpuInfo,
        error: parseError,
        time: Date.now() - initTime
      }
    } else {
      try {
        const result = await calculations[functionName](payload.n as number)
        body = {
          ...payload,
          cpus: cpuInfo,
          result,
          time: Date.now() - initTime
        }
      } catch (err) {
        body = {
          ...payload,
          cpus: cpuInfo,
          error: err instanceof Error ? err.message : err,
          time: Date.now() - initTime
        }
      }
    }

    return new Response(JSON.stringify(body, null, 2), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=UTF-8"
      }
    })
  }
}
