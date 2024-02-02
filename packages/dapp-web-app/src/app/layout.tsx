import type { Metadata } from 'next'
import Providers from 'contexts/providers'
// import './../assets/styles/globals.css'

export const metadata: Metadata = {
  title: 'Line by Figure31',
  description: 'Line by Figure31',
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=1.0"
        />
      </head> */}
      <body style={{ backgroundColor: 'white' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
