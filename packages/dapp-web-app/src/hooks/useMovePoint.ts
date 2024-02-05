import { useState } from 'react'
import {
  useLineMoveNorth,
  useLineMoveSouth,
  useLineMoveEast,
  useLineMoveWest,
  useLineMoveNortheast,
  useLineMoveSoutheast,
  useLineMoveNorthwest,
  useLineMoveSouthwest,
} from 'services/web3/generated'
import { ArrowMoveDirections, movementContractMap } from 'types/movements'
// import { WriteContractReturnType } from 'viem'

// type useMovePointType = {
//   moveTo: ArrowMoveDirections
// }

function useMovePoint() {
  const [currentMoveTo, setCurrentMoveTo] = useState<ArrowMoveDirections>()
  const moveNorth = useLineMoveNorth()
  const moveSouth = useLineMoveSouth()
  const moveEast = useLineMoveEast()
  const moveWest = useLineMoveWest()
  const moveNorthwest = useLineMoveNorthwest()
  const moveNortheast = useLineMoveNortheast()
  const moveSouthwest = useLineMoveSouthwest()
  const moveSoutheast = useLineMoveSoutheast()

  const movePointFunctions = {
    [ArrowMoveDirections.NORTH]: moveNorth,
    [ArrowMoveDirections.SOUTH]: moveSouth,
    [ArrowMoveDirections.EAST]: moveEast,
    [ArrowMoveDirections.WEST]: moveWest,
    [ArrowMoveDirections.NORTH_EAST]: moveNortheast,
    [ArrowMoveDirections.NORTH_WEST]: moveNorthwest,
    [ArrowMoveDirections.SOUTH_EAST]: moveSoutheast,
    [ArrowMoveDirections.SOUTH_WEST]: moveSouthwest,
  }

  const getMoveFunction = (moveTo: ArrowMoveDirections) => {
    setCurrentMoveTo(moveTo)
    return movePointFunctions[moveTo]
  }

  const getCurrentMoveToCall = () => {
    if (currentMoveTo === undefined)
      return {
        data: undefined,
        error: null,
        isError: false,
        isIdle: true,
        isLoading: false,
        isSuccess: false,
        reset: () => {},
        status: 'idle',
      }
    return movePointFunctions[currentMoveTo]
  }

  return {
    getMoveFunction,
    getCurrentMoveToCall,
  }
}

export default useMovePoint
