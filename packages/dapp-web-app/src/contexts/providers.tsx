'use client'

import * as React from 'react'
// import { ConnectKitProvider } from 'connectkit'
// import { WagmiConfig } from 'wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import duration from 'dayjs/plugin/duration'
import dayjs from 'dayjs'

dayjs.extend(duration)

import { config } from '../settings/wagmi'
import { GridItemProvider } from './GridItemContext'

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CacheProvider>
      <ChakraProvider>
        <GridItemProvider>
          {/* <WagmiConfig config={config}> */}
          {!mounted && <p>Loading</p>}
          {/* <ConnectKitProvider> */}
          {mounted && children}
          {/* </ConnectKitProvider> */}
          {/* </WagmiConfig> */}
        </GridItemProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
