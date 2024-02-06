import type { Metadata } from 'next'
import Providers from 'contexts/providers'
import './../assets/styles/globals.css'

export const metadata: Metadata = {
  title: 'Line by Figure31',
  description: 'Line by Figure31',
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: 'white' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
