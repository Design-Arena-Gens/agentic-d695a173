import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Job Alerts Agent',
  description: 'AI-powered job alerts and recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
