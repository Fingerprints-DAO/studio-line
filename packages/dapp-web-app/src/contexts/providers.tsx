'use client'

import { ConnectKitProvider } from 'connectkit'
import {
  Alert,
  AlertDescription,
  Box,
  ChakraProvider,
  CloseButton,
  Fade,
  useDisclosure,
} from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import duration from 'dayjs/plugin/duration'
import dayjs from 'dayjs'
import { WagmiConfig } from 'wagmi'

import { config } from 'settings/wagmi'
import theme from 'settings/theme'
import { TbScreenShareOff } from 'react-icons/tb'
import { useDisplayConfig } from 'hooks/useDisplayConfig'

dayjs.extend(duration)

function Providers({ children }: { children: React.ReactNode }) {
  const { isMediumScreen } = useDisplayConfig()
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true })

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
          <ConnectKitProvider theme={'minimal'} mode="light">
            <Fade in unmountOnExit>
              {children}
            </Fade>
          </ConnectKitProvider>
        </WagmiConfig>
        {isVisible && isMediumScreen && (
          <Box position={'fixed'} bottom={0} left={0} right={0}>
            <Alert status="warning" bgColor={'gray.300'}>
              <TbScreenShareOff size={40} color="gray.700" />
              <AlertDescription fontSize={'md'} ml={4} textColor={'gray.700'}>
                For the best experience, please use this website on a desktop or
                laptop.
              </AlertDescription>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={onClose}
                textColor={'gray.700'}
              />
            </Alert>
          </Box>
        )}
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
