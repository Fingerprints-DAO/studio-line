'use client'

import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Fade, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useMoveContext } from 'contexts/MoveContext'
import { SidebarArrow } from 'components/arrow/SidebarArrow'
import {
  getNextPoint,
  getSpecificArrowMoveDirection,
} from 'components/arrow/utils'
import { ArrowDirections } from 'types/movements'
import { TRAITS } from 'types/nft'
import { useHasReachedEnd } from 'hooks/use-has-reached-end'
import { useTransactionContext } from 'contexts/TransactionContext'
import {
  useLineMaxStarTokens,
  useLineNumStarTokens,
} from 'services/web3/generated'

export function MoveSection({ token }: { token: any }) {
  const { selectedGridItem, unavailableDirections, toggleFixMyToken } =
    useMoveContext()
  const {
    isLoading,
    isSuccess,
    isWaitingApproval,
    move,
    setNextPoint: setNextPointContext,
  } = useTransactionContext()
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
  const { data: starTokenSupply = 25n } = useLineMaxStarTokens({
    scopeKey: 'starTokenSupply',
    watch: true,
  })
  const { data: starTokenMinted = 0n } = useLineNumStarTokens({
    scopeKey: 'starTokenMinted',
    watch: true,
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

    const moveFunction = move(pointDirection!)
    if (!moveFunction) return

    await moveFunction.writeAsync!({
      args: [BigInt(selectedGridItem?.id || 0)],
    })
  }

  useEffect(() => {
    setArrowHover(undefined)
    setArrowSelected(undefined)
    setNextPoint({ col: null, row: null })
    setArrowHover(undefined)
    setArrowSelected(undefined)
  }, [selectedGridItem, setNextPoint])

  useEffect(() => {
    if (isSuccess) {
      setNextPointContext(`${nextPoint.row}-${nextPoint.col}`)
    }
  }, [isSuccess, nextPoint.col, nextPoint.row, setNextPointContext])

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
        isDisabled={!arrowSelected || isLoading}
      >
        {isWaitingApproval
          ? 'waiting for approval...'
          : isLoading
            ? 'processing...'
            : 'move'}
      </Button>
      {hasReachedEnd && starTokenSupply !== starTokenMinted && (
        <Button
          variant={'solid'}
          w={'full'}
          mt={1}
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
