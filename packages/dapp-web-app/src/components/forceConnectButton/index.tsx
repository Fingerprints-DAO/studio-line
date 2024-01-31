'use client'

import { Button } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'
import { PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

type ForceConnectButtonType = PropsWithChildren & {
  buttonText?: string
}

const ForceConnectButton = ({
  children,
  buttonText = 'Connect',
  ...props
}: ForceConnectButtonType) => {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <ConnectKitButton.Custom>
        {({ show }) => {
          return (
            <Button w={'full'} onClick={show} variant={'solid'} {...props}>
              {buttonText}
            </Button>
          )
        }}
      </ConnectKitButton.Custom>
    )
  }

  return children
}

export default ForceConnectButton
