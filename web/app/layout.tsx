import './globals.css'
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className="theme-apple">
      <body>
        <main className="p-3 w-full min-h-screen">{children}</main>
      </body>
    </html>
  )
}
