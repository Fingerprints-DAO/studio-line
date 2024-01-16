'use client'

import React from 'react'
import { Box } from '@chakra-ui/react'
import Auction from 'components/auction'
import { AuctionProvider } from 'contexts/AuctionContext'

export default function AuctionPage() {
  // const { chain } = useNetwork()
  // if (chain?.id) {
  //   getContractsDataForChainOrThrow(chain?.id).then((a) =>
  //     console.log('log', a)
  //   )
  // }

  return (
    <Box as={'main'}>
      <AuctionProvider>
        <Auction />
      </AuctionProvider>
    </Box>
  )
}
