import { auth } from "@/lib/auth"
import Link from "next/link"

export default async function ServiceContext({ params }: { params: { service: string } }) {
  const session = await auth()
  const svc = decodeURIComponent(params.service)
  return (
    <main className="p-6 space-y-4">
      <Link className="text-akari-muted" href="/dashboard">← 宇宙にもどる</Link>
      <h1 className="text-2xl">{svc}（{session?.user?.name}）</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-4">
          <div className="text-akari-muted text-sm">ステータス</div>
          <div>未接続</div>
          <div className="mt-3 flex gap-2">
            <button className="card px-3 py-2">接続する</button>
            <button className="card px-3 py-2">開く</button>
          </div>
        </div>
        <div className="card p-4">
          <div className="text-akari-muted text-sm">最近の活動</div>
          <ul className="mt-2 text-sm text-akari-muted">
            <li>まだ記録はありません</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

