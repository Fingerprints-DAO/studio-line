import { readContract } from '@wagmi/core'
import { lineConfig } from 'services/web3/generated'
import { useQuery } from 'wagmi'
import { getCanMoveKey } from './keys'
import { Interval } from 'types/interval'

const useCanMove = () => {
  const request = async () => {
    try {
      const data = await readContract({
        ...lineConfig,
        functionName: 'canMove',
      })

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  const canMove = useQuery(getCanMoveKey, request, {
    refetchInterval: Interval.CanMove,
    refetchIntervalInBackground: true,
  })

  return canMove
}

export default useCanMove
