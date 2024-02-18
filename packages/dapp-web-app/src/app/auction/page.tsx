'use client'
import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Auction from 'components/auction'
import { useLineCanMove } from 'services/web3/generated'
import { Interval } from 'types/interval'

export default function AuctionPage() {
  const {
    data: canMove,
    isLoading,
    isFetching,
  } = useLineCanMove({
    // staleTime: Interval.CanMove,
    // cacheTime: Interval.CanMove,
    scopeKey: 'canMove',
    watch: true,
    // enabled: true,
  })
  // console.log('Interval.CanMove', Interval.CanMove)

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
