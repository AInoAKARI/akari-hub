export const dynamic = "force-dynamic"

export const runtime = "nodejs"

export async function GET() {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      const send = (event: string, data: any) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`))
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
      }
      send("ping", { t: Date.now() })
      const id = setInterval(() => send("ping", { t: Date.now() }), 15000)
      return () => clearInterval(id)
    }
  })
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  })
}

