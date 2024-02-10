import type { Metadata } from 'next'
import Providers from 'contexts/providers'
import './../assets/styles/globals.css'
import { getBaseURL } from 'utils/getLink'

const defaultText = {
  title: 'Explore LINE by Figure31',
  description:
    'LINE is a photographic series of 200 tokens placed within a synthetic landscape, made up of a grid with distinct coordinates. Every token has an origin point which defines a unique “field of view.”',
}

export const metadata: Metadata = {
  title: {
    template: '%s | LINE by Figure31',
    default: defaultText.title,
  },
  description: defaultText.description,
  twitter: {
    ...defaultText,
    card: 'summary_large_image',
    site: getBaseURL(),
    creator: '@FingerprintsDAO',
  },
  openGraph: {
    ...defaultText,
    type: 'website',
    url: getBaseURL(),
  },
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
