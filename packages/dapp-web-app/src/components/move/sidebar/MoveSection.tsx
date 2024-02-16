'use client'

import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Fade, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useMoveContext } from 'contexts/MoveContext'
import { SidebarArrow } from 'components/arrow/SidebarArrow'
import { TxMessage } from 'components/txMessage'
import { TransactionError } from 'types/transaction'
import {
  getNextPoint,
  getSpecificArrowMoveDirection,
} from 'components/arrow/utils'
import useMovePoint from 'hooks/useMovePoint'
import { ArrowDirections } from 'types/movements'
import { TRAITS } from 'types/nft'
import { useWaitForTransaction } from 'wagmi'
import { useHasReachedEnd } from 'hooks/use-has-reached-end'

export function MoveSection({ token }: { token: any }) {
  const { selectedGridItem, unavailableDirections, toggleFixMyToken } =
    useMoveContext()
  const hasReachedEnd = useHasReachedEnd({
    row: selectedGridItem?.row,
    direction: selectedGridItem?.direction,
  })
  const [arrowHover, setArrowHover] = useState<ArrowDirections | undefined>()
  const [nextPoint, setNextPoint] = useState<{
    col: number | null
    row: number | null
  }>({ col: null, row: null })
  const [arrowSelected, setArrowSelected] = useState<
    ArrowDirections | undefined
  >()
  const { getMoveFunction, getCurrentMoveToCall } = useMovePoint()
  const moveTx = useWaitForTransaction({
    hash: getCurrentMoveToCall().data?.hash,
    enabled: getCurrentMoveToCall().data?.hash !== undefined,
  })

  const tokenDirection = useMemo(() => {
    if (!token) return ''

    return (
      token.attributes
        .find((attr: any) => attr.trait_type === TRAITS.DIRECTION)
        ?.value.toLowerCase() ?? ''
    )
  }, [token])

  const handleArrowMouseOver = (direction?: ArrowDirections) => {
    setArrowHover(direction)
  }
  const handleArrowOnClick = (direction: ArrowDirections) => {
    if (!selectedGridItem) return
    setArrowSelected(direction)
    const { row, col } = getNextPoint(
      Number(selectedGridItem.col),
      Number(selectedGridItem.row),
      tokenDirection,
      direction,
    )
    setNextPoint({ row, col })
  }
  const handleMove = async () => {
    const pointDirection = getSpecificArrowMoveDirection(
      tokenDirection,
      arrowSelected!,
    )
    if (!pointDirection) return

    const moveFunction = getMoveFunction(pointDirection!)
    await moveFunction.writeAsync({
      args: [BigInt(selectedGridItem?.id || 0)],
    })
  }

  useEffect(() => {
    setArrowHover(undefined)
    setArrowSelected(undefined)
    setNextPoint({ col: null, row: null })
    setArrowHover(undefined)
    setArrowSelected(undefined)
  }, [selectedGridItem])

  useEffect(() => {
    if (moveTx.isSuccess && !!arrowSelected) {
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }, [arrowSelected, moveTx.isSuccess])

  return (
    <Fade in={!!selectedGridItem} unmountOnExit>
      <Box pos={'relative'} w={'full'} h={'45px'}>
        <SidebarArrow
          displayCircle
          direction={selectedGridItem?.direction ?? null}
          isAvailable
          handleOnClick={handleArrowOnClick}
          handleMouseOver={handleArrowMouseOver}
          selected={arrowSelected}
          hovered={arrowHover}
          disableArrows={unavailableDirections}
        />
      </Box>
      {!arrowSelected && (
        <Text fontSize={'xs'} fontWeight={'bold'} mt={1}>
          Select a direction <br />
          to move
        </Text>
      )}
      {arrowSelected && (
        <Flex alignItems={'flex-end'} mt={1}>
          <Box>
            <Text fontSize={'xs'} fontWeight={'bold'}>
              From
            </Text>
            <Text fontSize={'xs'}>
              ({selectedGridItem?.col},{selectedGridItem?.row})
            </Text>
          </Box>
          <Box mx={1}>
            <Image
              src={'/move-to.svg'}
              width={16}
              height={16}
              alt={'Arrow to right'}
            />
          </Box>
          <Box>
            <Text fontSize={'xs'} fontWeight={'bold'}>
              To
            </Text>
            <Text fontSize={'xs'}>
              ({nextPoint.col},{nextPoint.row})
            </Text>
          </Box>
        </Flex>
      )}
      <Button
        variant={'solid'}
        w={'full'}
        mt={4}
        mb={1}
        onClick={handleMove}
        isDisabled={
          !arrowSelected || getCurrentMoveToCall().isLoading || moveTx.isLoading
        }
      >
        {getCurrentMoveToCall().isLoading
          ? 'waiting for approval...'
          : moveTx.isLoading
            ? 'processing...'
            : 'move'}
      </Button>
      <TxMessage
        hash={getCurrentMoveToCall().data?.hash}
        error={getCurrentMoveToCall().error as TransactionError}
        successMessage="Moved! Reloading..."
      />
      {hasReachedEnd && (
        <Button
          variant={'solid'}
          w={'full'}
          mt={4}
          mb={1}
          onClick={toggleFixMyToken}
          colorScheme="purple"
          bgColor={'purple.600'}
          borderColor={'purple.600'}
          _hover={{
            color: 'purple.600',
            borderColor: 'purple.600',
            backgroundColor: 'white',
          }}
        >
          fix my token on grid
        </Button>
      )}
    </Fade>
  )
}
