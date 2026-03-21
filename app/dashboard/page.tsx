import Universe from "@/components/universe/Universe"
import { auth } from "@/lib/auth"

const DEFAULT_SERVICES = [
  { id: "github", label: "私のコード（GitHub）", connected: false },
  { id: "google", label: "私の予定（Google）", connected: false },
  { id: "notion", label: "私のノート（Notion）", connected: false },
  { id: "slack", label: "私の会話（Slack）", connected: false },
  { id: "vercel", label: "私の庭づくり（Vercel）", connected: false },
  { id: "stripe", label: "私のやりとり（Stripe）", connected: false },
  { id: "discord", label: "私の集い（Discord）", connected: false }
]

export default async function Dashboard() {
  const session = await auth()
  const me = {
    name: session?.user?.name ?? "",
    displayName: session?.user?.name ?? ""
  }
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl">私の宇宙</h1>
      <Universe me={me} services={DEFAULT_SERVICES} />
    </main>
  )
}

