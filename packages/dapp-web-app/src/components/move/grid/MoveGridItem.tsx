import React, { memo, useMemo, useState } from 'react'
import { Box, Flex, Tooltip, Image as ChackraImage } from '@chakra-ui/react'
import { GridItemProperties } from 'contexts/MoveContext'
import GridNumber from './GridNumber'
import { Direction, GridSize } from 'types/grid'
import { Arrow } from 'components/arrow/GridArrow'
import { ArrowDirections } from 'components/arrow/utils'

interface GridItemProps extends GridItemProperties {
  width: number
  height: number
  lineWidth: number
  lineHeight: number
  isMinted: boolean
  isAvailable: boolean
  isSelected: boolean
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
}) => {
  const [isFirstRow, isLastRow, isFirstCol, isLastCol] = [
    row === GridSize - 1,
    row === 0,
    col === 0,
    col === GridSize - 1,
  ]
  const widthPx = `${width}px`
  const heightPx = `${height}px`

  const disableClick = !isAvailable
  const renderPoint = isMinted || isAvailable

  const handleClick = () => {
    toggleGridItem(index)
  }

  const bgColor = useMemo(() => {
    if (!isAvailable) return 'gray.200'
    if (isSelected) {
      if (direction === Direction.UP) return 'red.600'
      if (direction === Direction.DOWN) return 'cyan.600'
    }
    if (direction === Direction.UP) return 'red.100'
    if (direction === Direction.DOWN) return 'cyan.100'
    return 'gray.100'
  }, [direction, isAvailable, isSelected])

  const hideArrows = useMemo(() => {
    if (isLastCol)
      return [ArrowDirections.RIGHT, ArrowDirections.DIAGONAL_RIGHT]
    if (isFirstCol) return [ArrowDirections.LEFT, ArrowDirections.DIAGONAL_LEFT]

    return []
  }, [isFirstCol, isLastCol])

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
              {/* central point: small circle box in the middle of the grid item */}
              <Box
                pos={'absolute'}
                top={'50%'}
                left={'50%'}
                w={'7px'}
                h={'7px'}
                borderRadius={'full'}
                transform={'translate(-50%, -50%)'}
                bgColor={bgColor}
                zIndex={3}
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
            zIndex={1}
          >
            <Arrow
              {...arrowsProps}
              direction={direction}
              isSelected={isSelected}
              isAvailable={isAvailable}
              hide={hideArrows}
              w={`${lineWidth * 2 - 8}px`}
              h={`${lineHeight * 2 - 8}px`}
            />
            {/* {false && (
              <>
                <ChackraImage
                  {...arrowsProps}
                  src={`/${arrowImage}.svg`}
                  hidden={hideLastColumnDown || hideFirstColumUp}
                />
                <ChackraImage
                  {...arrowsProps}
                  src={`/${arrowImage}.svg`}
                  transform={'rotate(90deg)'}
                />
                <ChackraImage
                  {...arrowsProps}
                  src={`/${arrowImage}.svg`}
                  transform={'rotate(180deg)'}
                  hidden={hideLastColumUp || hideFirstColumnDown}
                />
                <ChackraImage
                  {...arrowsProps}
                  src={`/${arrowImage}-diagonal.svg`}
                  transform={'rotate(0deg)'}
                  hidden={hideLastColumnDown || hideFirstColumUp}
                />
                <ChackraImage
                  {...arrowsProps}
                  src={`/${arrowImage}-diagonal.svg`}
                  transform={'rotate(90deg)'}
                  hidden={hideLastColumUp || hideFirstColumnDown}
                />
              </>
            )} */}
          </Box>
        </>
      )}
    </Box>
  )
}

const MoveGridItem = memo(MoveGridItemComponent)
MoveGridItem.displayName = 'MoveGridItem'

export default MoveGridItem
