export const dynamic = "force-dynamic"

import { NextRequest } from "next/server"
import { getServiceApiKey } from "@/lib/vault"
import { auth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return new Response("unauthorized", { status: 401 })
  }
  const role = (session.user as any).role
  if (role !== "admin") {
    return new Response("forbidden", { status: 403 })
  }
  const { searchParams } = new URL(req.url)
  const service = searchParams.get("service")
  if (!service) return new Response("missing service", { status: 400 })
  const key = await getServiceApiKey({ service })
  if (!key) return new Response("not found", { status: 404 })
  // Return minimally, callers should not log or persist this.
  return Response.json({ service, key })
}

