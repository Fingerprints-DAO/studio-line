import React, { memo, useMemo, useState } from 'react'
import { Box, Flex, Tooltip, Image as ChackraImage } from '@chakra-ui/react'
import { GridItemProperties } from 'contexts/MoveContext'
import GridNumber from './GridNumber'
import { Direction, GridSize } from 'types/grid'
import { Arrow } from 'components/arrow/GridArrow'
import { useHexColor } from 'components/arrow/utils'
import { ArrowDirections } from 'types/movements'

interface GridItemProps extends GridItemProperties {
  width: number
  height: number
  lineWidth: number
  lineHeight: number
  isMinted: boolean
  isAvailable: boolean
  isSelected: boolean
  mintedItems: (string | undefined)[]
  toggleGridItem: (index: string) => void
}

const lineStyle = ({
  isHighlighted = false,
  isRow = false,
  width = '100%',
  height = '100%',
  startFrom = '50%',
}) => ({
  content: '""',
  position: 'absolute',
  bgColor: 'gray.200',
  ...(isRow
    ? {
        // up and down line
        left: '50%',
        top: startFrom,
        transform: `translateX(-50%)`,
        width: '1px',
        height,
      }
    : {
        // left and right line
        top: '50%',
        left: startFrom,
        transform: `translateY(-50%)`,
        height: '1px',
        width,
      }),
})

const MoveGridItemComponent: React.FC<GridItemProps> = ({
  width,
  height,
  image,
  index,
  row,
  col,
  direction,
  toggleGridItem,
  lineWidth,
  lineHeight,
  isMinted,
  isAvailable,
  isSelected,
  mintedItems,
}) => {
  const [isFirstRow, isLastRow, isFirstCol, isLastCol] = [
    row === GridSize - 1,
    row === 0,
    col === 0,
    col === GridSize - 1,
  ]
  const widthPx = `${width}px`
  const heightPx = `${height}px`

  const disableClick = !isMinted
  const renderPoint = isMinted || isAvailable

  const bgColor = useHexColor({
    isAvailable,
    isSelected,
    direction,
  })

  const handleClick = () => {
    toggleGridItem(index)
  }
  const hideArrows = useMemo(() => {
    if (isLastCol) {
      return [ArrowDirections.RIGHT, ArrowDirections.DIAGONAL_RIGHT]
    }
    if (isFirstCol) {
      return [ArrowDirections.LEFT, ArrowDirections.DIAGONAL_LEFT]
    }
  }, [isFirstCol, isLastCol])

  const disableArrows = useMemo(() => {
    const unavailableDirections = [] as ArrowDirections[]
    const nextRow = direction !== Direction.UP ? row - 1 : row + 1
    const [leftPos, diagonalLeftPos, centerPos, diagonalRightPos, rightPos] = [
      `${row}-${col - 1}`,
      `${nextRow}-${col - 1}`,
      `${nextRow}-${col}`,
      `${nextRow}-${col + 1}`,
      `${row}-${col + 1}`,
    ]

    if (mintedItems.includes(leftPos))
      unavailableDirections.push(ArrowDirections.LEFT)
    if (mintedItems.includes(diagonalLeftPos))
      unavailableDirections.push(ArrowDirections.DIAGONAL_LEFT)
    if (mintedItems.includes(centerPos))
      unavailableDirections.push(ArrowDirections.CENTER)
    if (mintedItems.includes(diagonalRightPos))
      unavailableDirections.push(ArrowDirections.DIAGONAL_RIGHT)
    if (mintedItems.includes(rightPos))
      unavailableDirections.push(ArrowDirections.RIGHT)

    return unavailableDirections
  }, [col, direction, mintedItems, row])

  const arrowsProps = {
    w: `100%`,
    h: `100%`,
    position: 'absolute',
  } as any

  return (
    <Box
      pos={'relative'}
      w={widthPx}
      h={heightPx}
      _after={
        !isLastRow
          ? lineStyle({
              isRow: true,
              height: `${lineHeight}px`,
              startFrom: `${Math.round(height / 2)}px`,
            })
          : {}
      }
      _before={
        !isLastCol
          ? lineStyle({
              isRow: false,
              width: `${lineWidth}px`,
              startFrom: `${Math.round(width / 2)}px`,
            })
          : {}
      }
    >
      {/* GRID NUMBERS */}
      {isFirstCol && (
        <GridNumber number={row} isColumn w={widthPx} h={heightPx} />
      )}
      {isLastRow && <GridNumber number={col} w={widthPx} h={heightPx} />}
      {/* GRID NUMBERS END */}

      {renderPoint && (
        <>
          <Tooltip
            hasArrow
            arrowSize={6}
            gutter={6}
            borderRadius={0}
            p={'8px'}
            bgColor={'rgba(45, 55, 72, 1)'}
            backdropFilter={'blur(4px)'}
            openDelay={1000}
            label={
              <Flex
                flexDir={'column'}
                alignItems={'center'}
                minH={'160px'}
                minW={'80px'}
              >
                <ChackraImage src={image} h={'160px'} m={0} />
              </Flex>
            }
            placement="auto"
          >
            <Box
              pos={'absolute'}
              top={0}
              left={0}
              right={0}
              bottom={0}
              onClick={disableClick ? undefined : handleClick}
              cursor={disableClick ? 'default' : 'pointer'}
            >
              <Box
                pos={'absolute'}
                top={'50%'}
                left={'50%'}
                w={'20px'}
                h={'20px'}
                borderRadius={'full'}
                transform={'translate(-50%, -50%)'}
                zIndex={4}
              />
            </Box>
          </Tooltip>
          <Box
            position={'absolute'}
            w={`${lineWidth * 2 - 8}px`}
            h={`${lineHeight * 2 - 8}px`}
            left={'50%'}
            top={'50%'}
            transform={`translate(-50%, -50%)`}
            ml={'-0.5px'}
            mb={'-0.5px'}
            zIndex={1}
          >
            <Arrow
              {...arrowsProps}
              direction={direction}
              isSelected={isSelected}
              isAvailable={isAvailable}
              disableArrows={disableArrows}
              hideArrows={hideArrows}
              displayCircle
              w={`${lineWidth * 2 - 8}px`}
              h={`${lineHeight * 2 - 8}px`}
            />
          </Box>
        </>
      )}
    </Box>
  )
}

const MoveGridItem = memo(MoveGridItemComponent)
MoveGridItem.displayName = 'MoveGridItem'

export default MoveGridItem
