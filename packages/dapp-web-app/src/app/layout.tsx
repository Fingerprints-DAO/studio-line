import type { Metadata } from 'next'
import Providers from 'contexts/providers'
import './../assets/styles/globals.css'
import { getBaseURL } from 'utils/getLink'

const defaultText = {
  title: 'LINE by Figure31',
  description:
    'LINE is a photographic series of 250 tokens placed within a synthetic landscape, made up of a grid with distinct coordinates. Every token has an origin point which defines a unique “field of view.”',
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
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': getBaseURL() + '/opengraph-image.jpg',
    'fc:frame:button:1': 'Explore the collection',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': getBaseURL() + '/',
    'fc:frame:button:2': 'Mint now',
    'fc:frame:button:2:action': 'link',
    'fc:frame:button:2:target': getBaseURL() + '/auction',
    // 'fc:frame:post_url': getBaseURL() + '/frame/api',
    // 'fc:frame:button:1:target':
    //   'eip155:11155111:0x70b487b6e655307c56c231ac7b6a3d84dd4d7f26',
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
