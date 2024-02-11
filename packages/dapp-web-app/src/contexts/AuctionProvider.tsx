import dayjs from 'dayjs'
import React, { useState, useEffect, useRef } from 'react'
import {
  useLineCanMove,
  useLineConfig,
  useLineCurrentTokenId,
  useLineGetCurrentPrice,
  useLineMaxSupply,
} from 'services/web3/generated'
import { AuctionState } from 'types/auction'
import { AuctionContext } from './AuctionContext'

export const AuctionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: config } = useLineConfig()
  const { data: canMove } = useLineCanMove()
  const { data: price = 0n } = useLineGetCurrentPrice({ watch: true })
  const { data: currentTokenId = 1n } = useLineCurrentTokenId({
    watch: true,
    cacheTime: 5000,
  })
  const { data: maxSupply = 0n } = useLineMaxSupply()
  const [startTime, endTime, startPrice, endPrice] = config || [0n, 0n, 0n, 0n]

  // Add useState for auctionState
  const [auctionState, setAuctionState] = useState<AuctionState>(
    getCurrentState(Number(startTime), Number(endTime)),
  )
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const checkAndUpdateState = () => {
      if (canMove) {
        setAuctionState(AuctionState.ENDED)
        return
      }

      const now = dayjs().unix()
      const ONE_MINUTE = 60 // in seconds

      const isCloseToStartOrEnd =
        Math.abs(now - Number(startTime)) <= ONE_MINUTE ||
        Math.abs(now - Number(endTime)) <= ONE_MINUTE

      setAuctionState(getCurrentState(Number(startTime), Number(endTime)))

      // If past endTime, clear interval and exit
      if (now > Number(endTime)) {
        clearInterval(intervalRef.current!)
        return
      }

      if (isCloseToStartOrEnd) {
        clearInterval(intervalRef.current!)
        intervalRef.current = setInterval(checkAndUpdateState, 1000)
      }
    }

    intervalRef.current = setInterval(checkAndUpdateState, 30000)
    checkAndUpdateState()

    return () => clearInterval(intervalRef.current!)
  }, [startTime, endTime, canMove])

  return (
    <AuctionContext.Provider
      value={{
        startTime,
        endTime,
        startPrice,
        endPrice,
        currentPrice: price,
        minted: currentTokenId - 1n,
        maxSupply,
        auctionState,
      }}
    >
      {children}
    </AuctionContext.Provider>
  )
}
