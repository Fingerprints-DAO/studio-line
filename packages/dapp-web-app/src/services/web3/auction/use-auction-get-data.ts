import { AuctionData } from 'types/auction'
import {
  useLineCurrentTokenId,
  useLineGetCurrentPrice,
  useLineMaxSupply,
} from '../generated'

const useAuctionData = (): AuctionData => {
  const { data: price } = useLineGetCurrentPrice({
    watch: true,
    scopeKey: 'price',
  })
  const { data: currentTokenId } = useLineCurrentTokenId({
    watch: true,
    cacheTime: 5_000,
    scopeKey: 'currentTokenId',
  })
  const { data: maxSupply } = useLineMaxSupply()

  if (!price || !currentTokenId || !maxSupply) {
    return {
      currentPrice: 0n,
      minted: 0n,
      maxSupply: 0n,
    }
  }

  return {
    currentPrice: price,
    minted: currentTokenId - 1n,
    maxSupply,
  }
}

export default useAuctionData
