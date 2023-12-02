import type { Metadata } from 'next'

// These styles apply to every route in the application
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'Kube Sentry',
  description: 'Next Generation Kubernetes Monitoring',
}

import counter from "./counter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>Nav goes here</nav>
        <main>{children}</main>
      </body>
    </html>
  )
}