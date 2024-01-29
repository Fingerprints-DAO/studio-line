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

dayjs.extend(duration)

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={config}>
          {!mounted && <p>Loading</p>}
          <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
        </WagmiConfig>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
