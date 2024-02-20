import { readContract } from '@wagmi/core'
import { lineConfig } from 'services/web3/generated'
import { useQuery } from 'wagmi'
import { getTokens } from './keys'
import { Interval } from 'types/interval'

const useGetTokens = () => {
  const request = async () => {
    try {
      const data = await readContract({
        ...lineConfig,
        functionName: 'getTokens',
      })

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  const starGetTokens = useQuery(getTokens, request, {
    refetchInterval: Interval.GetGrid,
    refetchIntervalInBackground: true,
  })

  return starGetTokens
}

export default useGetTokens
