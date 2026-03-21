import "./globals.css"
import type { ReactNode } from "react"
import { Zen_Maru_Gothic, Outfit, JetBrains_Mono } from "next/font/google"
import CommandPalette from "@/components/command-palette"

export const metadata = {
  title: "akari-hub",
  description: "あかりOS Identity Hub"
}

const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-maru"
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit"
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${outfit.variable} ${zenMaru.variable} ${jetBrainsMono.variable} min-h-screen antialiased font-sans`}>
        <div className="min-h-screen">
          {children}
        </div>
        {/* Global Command Palette (Cmd/Ctrl+K) */}
        <CommandPalette />
      </body>
    </html>
  )
}
