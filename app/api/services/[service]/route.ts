export const dynamic = "force-dynamic"

import { NextRequest } from "next/server"
import { auth } from "@/lib/auth"
import { getGitHubSummary } from "@/lib/services/github"
import { getGoogleSummary } from "@/lib/services/google"
import { getNotionSummary } from "@/lib/services/notion"
import { getSlackSummary } from "@/lib/services/slack"
import { getVercelSummary } from "@/lib/services/vercel"
import { getStripeSummary } from "@/lib/services/stripe"

export async function GET(req: NextRequest, { params }: { params: { service: string } }) {
  const session = await auth()
  if (!session?.user) return new Response("unauthorized", { status: 401 })
  const svc = params.service
  let data: any = null
  const userId = session.user.email ?? ""
  switch (svc) {
    case "github": data = await getGitHubSummary(userId); break
    case "google": data = await getGoogleSummary(userId); break
    case "notion": data = await getNotionSummary(userId); break
    case "slack": data = await getSlackSummary(userId); break
    case "vercel": data = await getVercelSummary(userId); break
    case "stripe": data = await getStripeSummary(userId); break
    default: return new Response("not found", { status: 404 })
  }
  return Response.json({ service: svc, data })
}

