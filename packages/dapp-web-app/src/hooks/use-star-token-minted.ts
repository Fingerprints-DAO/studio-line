import { readContract } from '@wagmi/core'
import { lineConfig } from 'services/web3/generated'
import { useQuery } from 'wagmi'
import { numStarTokens } from './keys'
import { Interval } from 'types/interval'

const useStarTokenMinted = () => {
  const request = async () => {
    try {
      const data = await readContract({
        ...lineConfig,
        functionName: 'numStarTokens',
      })

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  const starTokenMinted = useQuery(numStarTokens, request, {
    refetchInterval: Interval.StarTokenMinted,
    refetchIntervalInBackground: true,
  })

  return starTokenMinted
}

export default useStarTokenMinted
