export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workspace/:path*",
    "/identity/:path*",
    "/api/services/:path*",
    "/api/vault/:path*"
  ]
}

