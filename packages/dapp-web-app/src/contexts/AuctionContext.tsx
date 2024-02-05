import dayjs from 'dayjs'
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react'
import useAuctionGetConfig from 'services/web3/auction/use-auction-get-config'
import useAuctionData from 'services/web3/auction/use-auction-get-data'
import {
  useLineConfig,
  useLineCurrentTokenId,
  useLineGetCurrentPrice,
  useLineMaxSupply,
} from 'services/web3/generated'
import { AuctionConfig, AuctionData, AuctionState } from 'types/auction'

export const AuctionContext = createContext<
  AuctionConfig &
    AuctionData & {
      auctionState: AuctionState
    }
>({
  startTime: 0n,
  endTime: 0n,
  startPrice: 0n,
  endPrice: 0n,
  currentPrice: 0n,
  minted: 0n,
  maxSupply: 0n,
  auctionState: AuctionState.NOT_STARTED,
})

export const useAuctionContext = () => useContext(AuctionContext)

const getCurrentState = (
  startTime?: number,
  endTime?: number,
  isEnded = false,
) => {
  if (!startTime || !endTime) {
    return AuctionState.NOT_STARTED
  }
  if (isEnded) {
    return AuctionState.ENDED
  }

  const now = dayjs()
  const start = dayjs.unix(startTime)
  const end = dayjs.unix(endTime)

  if (now.isAfter(end)) {
    return AuctionState.RESTING
  }

  if (now.isAfter(start)) {
    return AuctionState.STARTED
  }

  return AuctionState.NOT_STARTED
}

export const AuctionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: config } = useLineConfig()
  const { data: price = 0n } = useLineGetCurrentPrice({ watch: true })
  const { data: currentTokenId = 1n } = useLineCurrentTokenId({
    watch: true,
    cacheTime: 5_000,
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

    checkAndUpdateState()

    return () => clearInterval(intervalRef.current!)
  }, [startTime, endTime])

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
