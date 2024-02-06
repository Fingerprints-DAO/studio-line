import React, { memo, useMemo, useState } from 'react'
import { Box, Flex, Tooltip, Image as ChackraImage } from '@chakra-ui/react'
import { GridItemProperties } from 'contexts/TokensContext'
import { Direction, GridSize } from 'types/grid'
import GridNumber from 'components/gridNumber'

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

const AuctionGridItemComponent: React.FC<GridItemProps> = ({
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

  const disableClick = isMinted || !isAvailable
  const renderPoint = isMinted || isAvailable || isSelected

  const handleClick = () => {
    toggleGridItem(index)
  }

  const bgColor = useMemo(() => {
    if (isMinted) return 'gray.200'
    if (direction === Direction.UP) return 'red.500'
    if (direction === Direction.DOWN) return 'cyan.500'

    return 'gray.500'
  }, [direction, isMinted])

  return (
    <Box
      pos={'relative'}
      w={widthPx}
      h={heightPx}
      onClick={disableClick ? undefined : handleClick}
      cursor={disableClick ? 'default' : 'pointer'}
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
        <Tooltip
          hasArrow
          arrowSize={6}
          gutter={6}
          borderRadius={0}
          p={'8px'}
          bgColor={'rgba(45, 55, 72, 1)'}
          backdropFilter={'blur(4px)'}
          openDelay={500}
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
          <Box pos={'absolute'} top={0} left={0} right={0} bottom={0}>
            {/* central point: small circle box in the middle of the grid item */}
            <Box
              pos={'absolute'}
              top={'50%'}
              left={'50%'}
              w={'10px'}
              h={'10px'}
              borderRadius={'full'}
              transform={'translate(-50%, -50%)'}
              bgColor={isAvailable && !isSelected ? 'gray.200' : bgColor}
              borderWidth={isAvailable ? '2px' : ''}
              borderColor={isAvailable ? bgColor : ''}
              zIndex={4}
            />
          </Box>
        </Tooltip>
      )}
    </Box>
  )
}

const AuctionGridItem = memo(AuctionGridItemComponent)
AuctionGridItem.displayName = 'AuctionGridItem'

export default AuctionGridItem
