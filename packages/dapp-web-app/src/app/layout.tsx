import type { Metadata } from 'next'
import Providers from 'contexts/providers'
import './../assets/styles/globals.css'

export const metadata: Metadata = {
  title: 'Explore LINE by Figure31',
  description:
    'LINE is a photographic series of 200 tokens placed within a synthetic landscape, made up of a grid with distinct coordinates. Every token has an origin point which defines a unique “field of view.”',
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
