'use client'
import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Auction from 'components/auction'
import useCanMove from 'hooks/use-can-move'

export default function AuctionPage() {
  const { data: canMove } = useCanMove()
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
