import { AuctionData } from 'types/auction'
import { useLineCurrentTokenId, useLineMaxSupply } from '../generated'
import usePrice from 'hooks/use-price'

const useAuctionData = (): AuctionData => {
  const { data: price = 0n } = usePrice()
  const { data: currentTokenId } = useLineCurrentTokenId({
    watch: false,
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
