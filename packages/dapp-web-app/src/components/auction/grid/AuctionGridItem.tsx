import React, { memo, useMemo, useState } from 'react'
import { Box, Tooltip } from '@chakra-ui/react'
import { GridItemProperties } from 'contexts/AuctionContext'
import Image from 'next/image'
// import blueArrows from 'public/blueArrows.png'

interface GridItemProps extends GridItemProperties {
  width: number
  height: number
  isSelected: boolean
  isAvailable: boolean
  isMinted: boolean
  toggleGridItem: (index: string) => void
}

const lineStyle = (isHighlighted = false) => ({
  content: '""',
  position: 'absolute',
  bgColor: isHighlighted ? 'red' : 'blackAlpha.600',
})

const AuctionGridItemComponent: React.FC<GridItemProps> = ({
  width,
  height,
  image,
  index,
  row,
  col,
  isSelected,
  isAvailable,
  isMinted,
  direction,
  toggleGridItem,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const [isFirstRow, isLastRow, isFirstCol, isLastCol] = [
    row === 24,
    row === 0,
    col === 0,
    col === 24,
  ]

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const handleClick = () => {
    toggleGridItem(index)
  }

  const disableClick = isMinted || !isAvailable
  const isBorder = isFirstRow || isFirstCol || isLastRow || isLastCol
  const isOdd = col % 2 === 0

  const bgColor = useMemo(() => {
    // if (isHighlighted) {
    //   return 'red.300'
    // }
    if (isBorder) {
      return '#d2d2d2'
    }
    if (isOdd) {
      return '#737373'
    }
    return '#191919'
  }, [isBorder, isOdd])

  return (
    <Box
      id={index}
      pos={'relative'}
      w={`${width}px`}
      h={`${height}px`}
      onClick={disableClick ? undefined : handleClick}
      cursor={disableClick ? 'not-allowed' : 'pointer'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box pos={'absolute'} top={0} left={0} right={0} bottom={0}>
        {/* left line */}
        {!isFirstCol && (
          <Box
            pos={'absolute'}
            top={'50%'}
            right={'50%'}
            w={'calc(100% + 11px)'}
            transform={'translate(0, -50%)'}
            h={'1px'}
            bgColor={'black'}
          />
        )}
        {/* right line */}
        {!isLastCol && (
          <Box
            pos={'absolute'}
            top={'50%'}
            left={'50%'}
            w={'calc(100% + 11px)'}
            transform={'translate(0%, -50%)'}
            h={'1px'}
            bgColor={'black'}
          />
        )}

        {/* bottom line */}
        {!isLastRow && (
          <Box
            pos={'absolute'}
            top={'50%'}
            left={'50%'}
            w={'1px'}
            h={'calc(100% + 11px)'}
            transform={'translate(-50%, 0%)'}
            bgColor={'black'}
          />
        )}
        {/* top line */}
        {!isFirstRow && (
          <Box
            pos={'absolute'}
            bottom={'50%'}
            left={'50%'}
            w={'1px'}
            h={'calc(100% + 11px)'}
            transform={'translate(-50%, 0%)'}
            bgColor={'black'}
          />
        )}
      </Box>

      <Box
        w={'100%'}
        h={'100%'}
        backgroundSize="cover"
        pos={'relative'}
        zIndex={2}
        _hover={{
          width: `${width * 2}px`,
          height: `${height * 2}px`,
          transition: 'width 0.2s, height 0.2s, transform 0.2s, filter 2s',
          transform: 'translate(-25%, -25%)',
          filter: 'none',
          zIndex: 3,
        }}
        border={isMinted ? '2px solid red' : 'none'}
      >
        <Box
          pos={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={isAvailable || isHovered || isSelected ? 3 : 0}
          _hover={{
            transition: 'filter 2s',
          }}
          filter={
            !isAvailable || isSelected
              ? 'none'
              : isHovered
              ? 'none'
              : 'grayscale(100%)'
          }
          transition={'filter 1s'}
        >
          <Tooltip
            label={isMinted ? 'Alredy minted' : 'Not mintable'}
            bg={isMinted ? 'blackAlpha.600' : 'red.600'}
            isDisabled={(!isMinted && isAvailable) || isSelected}
          >
            <Image
              src={image}
              alt="placeholder"
              width={width * 2}
              height={height * 2}
            />
          </Tooltip>
        </Box>
        <Box
          bgColor={bgColor}
          pos={'absolute'}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
          color={'black'}
        />
      </Box>
    </Box>
  )
}

const AuctionGridItem = memo(AuctionGridItemComponent)
AuctionGridItem.displayName = 'AuctionGridItem'

export default AuctionGridItem
