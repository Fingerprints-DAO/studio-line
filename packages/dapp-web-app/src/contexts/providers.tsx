'use client'

import { ConnectKitProvider } from 'connectkit'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import duration from 'dayjs/plugin/duration'
import dayjs from 'dayjs'
import { WagmiConfig } from 'wagmi'

import { config } from 'settings/wagmi'
import theme from 'settings/theme'
import { useEffect, useState } from 'react'
import { useDisplayConfig } from 'hooks/useDisplayConfig'

dayjs.extend(duration)

function Providers({ children }: { children: React.ReactNode }) {
  // const { isBrowser } = useDisplayConfig()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CacheProvider>
      {/* <head>
        <meta
          name="viewport"
          content={`width=device-width, initial-scale=${
            isBrowser ? 1.0 : 0.5
          }, minimum-scale=0.5, maximum-scale=1.0`}
        />
      </head> */}
      <ChakraProvider theme={theme}>
        <WagmiConfig config={config}>
          {!mounted && <p>Loading</p>}
          <ConnectKitProvider theme={'minimal'} mode="light">
            {mounted && children}
          </ConnectKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
