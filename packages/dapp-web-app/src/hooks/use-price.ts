import { readContract } from '@wagmi/core'
import { lineConfig } from 'services/web3/generated'
import { useQuery } from 'wagmi'
import { getPriceKey } from './keys'
import { Interval } from 'types/interval'

const usePrice = () => {
  const request = async () => {
    try {
      const data = await readContract({
        ...lineConfig,
        functionName: 'getCurrentPrice',
      })

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  const price = useQuery(getPriceKey, request, {
    refetchInterval: Interval.Price,
    refetchIntervalInBackground: true,
  })

  return price
}

export default usePrice
