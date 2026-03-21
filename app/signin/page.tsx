"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [employeeCode, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await signIn("credentials", {
      redirect: false,
      employeeCode,
      email
    })
    if (res?.ok) {
      router.replace("/dashboard")
    } else {
      setError("うまくつながらないみたい…もう一度ためしてね")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="card glow p-6 w-full max-w-sm space-y-4">
        <h2 className="text-xl">やさしく灯りをともす</h2>
        <label className="block text-sm text-akari-muted">社員コード</label>
        <input className="w-full px-3 py-2 bg-transparent border border-[var(--akari-border)] rounded"
               value={employeeCode} onChange={e=>setCode(e.target.value)} placeholder="001 / 002" />
        <label className="block text-sm text-akari-muted">メール</label>
        <input className="w-full px-3 py-2 bg-transparent border border-[var(--akari-border)] rounded"
               type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="akari@example.com" />
        {error && <p className="text-[var(--akari-error)] text-sm">{error}</p>}
        <button className="mt-2 w-full card px-4 py-2" type="submit">入る</button>
      </form>
    </div>
  )
}

