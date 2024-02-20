import React, { memo, useMemo, useState } from 'react'
import { Box, Flex, Tooltip, Image as ChackraImage } from '@chakra-ui/react'
import { GridItemProperties } from 'contexts/MoveContext'
import { Direction, GridSize, ImageSizes, generateImage } from 'types/grid'
import { Arrow } from 'components/arrow/GridArrow'
import { useHexColor } from 'components/arrow/utils'
import { ArrowDirections } from 'types/movements'
import GridNumber from 'components/gridNumber'
import ChakraNextImageLoader from 'components/chakraNextImageLoader'
import { getArrowsAvailability } from 'utils/getArrowsAvailability'
import { ArrowAll } from 'components/arrow/GridArrowAll'

interface GridItemProps extends GridItemProperties {
  width: number
  height: number
  lineWidth: number
  lineHeight: number
  isMinted: boolean
  isAvailable: boolean
  isSelected: boolean
  isSelectable: boolean
  mintedItems: (string | undefined)[]
  isFixedSelected: boolean
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
  isSelectable,
  isFixedSelected,
  mintedItems,
  isLocked,
}) => {
  const [isFirstRow, isLastRow, isFirstCol, isLastCol] = [
    row === GridSize - 1,
    row === 0,
    col === 0,
    col === GridSize - 1,
  ]
  const widthPx = `${width}px`
  const heightPx = `${height}px`
  const posId = useMemo(() => col + row * GridSize, [col, row])

  const disableClick = isSelectable ? isMinted : !isMinted
  const renderArrows = isMinted || isAvailable || isSelectable
  const renderPoint =
    (!isSelected &&
      !isMinted &&
      !isAvailable &&
      !isFirstCol &&
      !isLastCol &&
      !isFirstRow &&
      !isLastRow) ||
    isFixedSelected
  const isStar = isFixedSelected || isLocked

  const { disableArrows } = getArrowsAvailability({
    index,
    direction,
    mintedPositions: mintedItems,
  })

  const handleClick = () => {
    toggleGridItem(index)
  }

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

      {renderArrows && (
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
                w={'100px'}
                h={'150px'}
              >
                <ChakraNextImageLoader
                  src={
                    posId !== null
                      ? generateImage(posId, ImageSizes.MEDIUM)
                      : image
                  }
                  imageWidth={286}
                  imageHeight={433}
                  alt="Token image"
                />
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
                w={'10px'}
                h={'10px'}
                borderRadius={'full'}
                transform={'translate(-50%, -50%)'}
                bgColor={renderPoint && !isFixedSelected ? 'white' : ''}
                borderWidth={renderPoint && !isFixedSelected ? '2px' : ''}
                borderColor={
                  renderPoint && !isFixedSelected ? 'purple.200' : ''
                }
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
            ml={isStar ? '0.5px' : '-0.5px'}
            mb={isStar ? '0' : '-0.5px'}
            zIndex={isSelected || isAvailable ? 2 : 1}
          >
            {isStar && (
              <ArrowAll
                {...arrowsProps}
                isLocked={isLocked}
                isOwner={isAvailable}
                isSelected={isSelected || isFixedSelected}
                w={`${lineWidth * 2 - 10}px`}
                h={`${lineHeight * 2 - 8}px`}
              />
            )}
            {!isStar && (
              <Arrow
                {...arrowsProps}
                direction={direction}
                isSelected={isSelected}
                isAvailable={isAvailable}
                disableArrows={disableArrows}
                displayCircle
                w={`${lineWidth * 2 - 8}px`}
                h={`${lineHeight * 2 - 8}px`}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

const MoveGridItem = memo(MoveGridItemComponent)
MoveGridItem.displayName = 'MoveGridItem'

export default MoveGridItem
