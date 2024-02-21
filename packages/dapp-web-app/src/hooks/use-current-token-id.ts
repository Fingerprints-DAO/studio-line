import { readContract } from '@wagmi/core'
import { lineConfig, useLineMaxSupply } from 'services/web3/generated'
import { useQuery, useQueryClient } from 'wagmi'
import { getCanMoveKey, getCurrentTokenId } from './keys'
import { Interval } from 'types/interval'

const useCurrentTokenId = () => {
  const queryClient = useQueryClient()
  const { data: maxSupply = 250n } = useLineMaxSupply()

  const request = async () => {
    try {
      const data = await readContract({
        ...lineConfig,
        functionName: 'currentTokenId',
      })

      if (data >= maxSupply) {
        queryClient.invalidateQueries(getCanMoveKey)
      }

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  const currentTokenId = useQuery(getCurrentTokenId, request, {
    refetchInterval: Interval.TokenId,
    refetchIntervalInBackground: true,
  })

  return currentTokenId
}

export default useCurrentTokenId
