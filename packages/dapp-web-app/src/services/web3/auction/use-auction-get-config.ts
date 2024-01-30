import { AuctionConfig } from 'types/auction'
import { useLineConfig } from '../generated'

const useAuctionGetConfig = (): AuctionConfig => {
  const { data: config } = useLineConfig()

  if (!config) {
    return {
      startTime: 0n,
      endTime: 0n,
      startPrice: 0n,
      endPrice: 0n,
    }
  }

  return {
    startTime: config[0],
    endTime: config[1],
    startPrice: config[2],
    endPrice: config[3],
  }
}

export default useAuctionGetConfig
