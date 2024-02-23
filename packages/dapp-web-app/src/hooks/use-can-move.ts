import { useQuery } from 'wagmi'
import { getCanMoveKey } from './keys'
import { Interval } from 'types/interval'

const useCanMove = () => {
  const request = async () => {
    try {
      return true
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
