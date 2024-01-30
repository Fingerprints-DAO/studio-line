import { AuctionData } from 'types/auction'
import {
  useLineCurrentTokenId,
  useLineGetCurrentPrice,
  useLineMaxSupply,
} from '../generated'

const useAuctionData = (): AuctionData => {
  const { data: price } = useLineGetCurrentPrice({ watch: true })
  const { data: currentTokenId } = useLineCurrentTokenId({
    watch: true,
    cacheTime: 5_000,
  })
  const { data: maxSupply } = useLineMaxSupply()

  if (!price || !currentTokenId || !maxSupply) {
    return {
      price: 0n,
      minted: 0n,
      maxSupply: 0n,
    }
  }

  return {
    price,
    minted: currentTokenId - 1n,
    maxSupply,
  }
}

export default useAuctionData
