import { readContract } from '@wagmi/core'
import { lineConfig } from 'services/web3/generated'
import { useQuery } from 'wagmi'
import { getGrid } from './keys'
import { Interval } from 'types/interval'

const useGetGrid = () => {
  const request = async () => {
    try {
      const data = await readContract({
        ...lineConfig,
        functionName: 'getGrid',
      })

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  const starGetGrid = useQuery(getGrid, request, {
    refetchInterval: Interval.GetGrid,
    refetchIntervalInBackground: true,
  })

  return starGetGrid
}

export default useGetGrid
