import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      employeeCode?: string
      role?: "admin" | "manager"
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    employeeCode?: string
    role?: "admin" | "manager"
  }
}

