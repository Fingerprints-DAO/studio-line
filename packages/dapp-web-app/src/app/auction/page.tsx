'use client'
import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Auction from 'components/auction'
import { useLineCanMove } from 'services/web3/generated'

export default function AuctionPage() {
  const { data: canMove } = useLineCanMove({ watch: true })

  useEffect(() => {
    if (canMove) {
      window.location.href = '/move'
    }
  }, [canMove])

  return (
    <Box as={'main'}>
      <Auction />
    </Box>
  )
}
