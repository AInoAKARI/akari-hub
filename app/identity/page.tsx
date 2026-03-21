import { auth } from "@/lib/auth"

export default async function IdentityCard() {
  const session = await auth()
  const user = session?.user as any
  const now = new Date()
  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">アイデンティティ</h1>
      <div className="card glow p-6 max-w-xl">
        <div className="text-xl mb-1">{user?.name ?? ""}</div>
        <div className="text-akari-muted text-sm mb-4">ありがとうKawaii Aiアイシテル合同会社 {user?.role === 'admin' ? '代表社員' : 'マネージャー'}</div>
        <div>社員コード: {user?.employeeCode ?? '-'}</div>
        <div className="mt-2">接続済みサービス: 0</div>
        <div className="mt-2">最終ログイン: {now.toLocaleString('ja-JP')}</div>
        <div className="mt-2">信頼スコア: ★★★★★（内部指標）</div>
      </div>
    </main>
  )
}

