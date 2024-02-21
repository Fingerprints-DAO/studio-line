'use client'

import React, { useMemo } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import { shortenAddress } from 'utils/string'

type WalletProps = ButtonProps & {
  buttonWidth?: string
  isDrawer?: boolean
}

const Wallet = ({
  buttonWidth = 'full',
  isDrawer = false,
  ...props
}: WalletProps) => {
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const name = shortenAddress(
    ensName || address,
    isDrawer ? 8 : 5,
    isDrawer ? 8 : 3,
  )

  const handleConnectWallet =
    (isConnected: boolean, show?: () => void) => () =>
      isConnected ? disconnect() : show?.()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <Button
            w={buttonWidth}
            onClick={handleConnectWallet(isConnected, show)}
            variant={isConnected ? 'outline' : 'solid'}
            {...props}
          >
            {isConnected ? name : 'connect'}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default Wallet
