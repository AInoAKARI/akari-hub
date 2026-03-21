import Link from "next/link"
import { auth } from "@/lib/auth"

export default async function Landing() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl tracking-tight" style={{textShadow:'0 0 24px rgba(244,162,97,0.2)'}}>
          おかえり、灯りの庭へ
        </h1>
        <p className="text-akari-muted max-w-md">
          私が先、アカウントが後。あなたを中心に世界がひらく。
        </p>
      </div>

      {!session ? (
        <Link href="/signin" className="card glow px-6 py-3 text-lg" prefetch>
          そっと灯りをつける
        </Link>
      ) : (
        <div className="flex gap-3">
          <Link href="/dashboard" className="card px-5 py-2">私の宇宙へ</Link>
          <Link href="/identity" className="card px-5 py-2">アイデンティティ</Link>
          <Link href="/workspace" className="card px-5 py-2">ワークスペース</Link>
        </div>
      )}
    </main>
  )
}
