import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sistema Arte Vision Agency",
  description: "Sistema de Gestão Interno Arte Vision Agency",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
<head>
  {/* Favicon */}
<link rel="icon" type="image/png" sizes="32x32" href="https://i.imgur.com/fy7RgKT.png" />
<link rel="icon" type="image/png" sizes="16x16" href="https://i.imgur.com/fy7RgKT.png" />
<link rel="apple-touch-icon" sizes="180x180" href="https://i.imgur.com/fy7RgKT.png" />

  {/* Fontes */}
  <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
  `}</style>
</head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
