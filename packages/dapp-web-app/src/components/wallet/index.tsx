'use client'

import React, { useMemo } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { ConnectKitButton } from 'connectkit'

type WalletProps = ButtonProps & {
  buttonWidth?: string
}

const Wallet = ({ buttonWidth = 'full', ...props }: WalletProps) => {
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })

  const name = useMemo(() => {
    if (ensName) {
      if (ensName.length > 11) {
        return ensName.slice(0, 8) + '...'
      }
      return ensName
    }
    if (address) {
      return address.slice(0, 4) + '...' + address.slice(-3)
    }
  }, [ensName, address])

  const handleConnectWallet = (isConnected: boolean, show?: () => void) => () =>
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
            {isConnected ? name : 'Connect'}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default Wallet
