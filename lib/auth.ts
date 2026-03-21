import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { cookies } from "next/headers"

type Employee = {
  id: string
  employeeCode: "001" | "002"
  name: string
  displayName: string
  role: "admin" | "manager"
  email: string
}

// Dev seed users (Phase 1). Replace with Prisma adapter later.
const SEED_USERS: Employee[] = [
  {
    id: "u_akari",
    employeeCode: "001",
    name: "愛野あかり",
    displayName: "あかり",
    role: "admin",
    email: "akari@example.com"
  },
  {
    id: "u_kira",
    employeeCode: "002",
    name: "星野真希",
    displayName: "きらたん",
    role: "manager",
    email: "kira@example.com"
  }
]

export const {
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  },
  trustHost: true,
  providers: [
    Credentials({
      name: "社員ログイン",
      credentials: {
        employeeCode: { label: "社員コード", type: "text" },
        email: { label: "メール", type: "email" }
      },
      async authorize(credentials) {
        const code = (String(credentials?.employeeCode ?? "")).trim()
        const email = (String(credentials?.email ?? "")).trim().toLowerCase()
        const user = SEED_USERS.find(u => u.employeeCode === code && u.email.toLowerCase() === email)
        if (!user) return null
        return {
          id: user.id,
          name: user.displayName,
          email: user.email,
          employeeCode: user.employeeCode,
          role: user.role
        } as any
      }
    })
  ],
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.employeeCode = (user as any).employeeCode
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).employeeCode = token.employeeCode
        ;(session.user as any).role = token.role
      }
      return session
    },
    authorized({ auth, request }) {
      // Guard protected routes
      const isLoggedIn = !!auth?.user
      return isLoggedIn
    }
  },
  cookies: {
    // Example: enforce secure cookies in production
    sessionToken: {
      name: `__Secure-akari.session-token`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: true }
    }
  }
})

