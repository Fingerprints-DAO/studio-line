'use client'

import { Box, Flex, Link, Text, Fade } from '@chakra-ui/react'
import { AuctionBanner } from 'components/auctionBanner'
import { TextLine } from 'components/textLine'
import { TokenPreview } from 'components/tokenPreview'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import { useCoordinates } from 'hooks/use-coordinates'
import { useHasReachedEnd } from 'hooks/use-has-reached-end'
import { useDisplayConfig } from 'hooks/useDisplayConfig'
import { useMemo } from 'react'
import { Direction, GridSize } from 'types/grid'
import { getArweaveImageURL } from 'utils/getLink'
import { coordinatesToText } from 'utils/handleCoordinates'

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 250)
}

export function SidebarDetailed({ isDrawer = false, ...props }: any) {
  const {
    lastSelectedGridItem,
    highlightGridItem,
    gridItemsState,
    movements,
    startingPoint,
    isFixed,
  } = usePlaygroundContext()
  const hasReachedEnd = useHasReachedEnd({
    row: lastSelectedGridItem?.row,
    direction: lastSelectedGridItem?.direction,
  })
  const randomTokenId = useMemo(getRandomNumber, [])
  const { x, y } = useCoordinates(lastSelectedGridItem?.index)
  const itemId = lastSelectedGridItem
    ? lastSelectedGridItem.row * GridSize + lastSelectedGridItem.col
    : 0

  const highlightItems = highlightGridItem
    .map((item) => gridItemsState[item])
    .filter((item) => item)

  return (
    <Box w={'100%'} h={'100%'} {...props}>
      {!lastSelectedGridItem && (
        <>
          <AuctionBanner displayMintNow />
          <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
            Select a token to get started
          </Text>
          <Text mb={4} fontSize={'md'}>
            Here is the LINE playground, preview token images and plan your
            moves on the board.
          </Text>
        </>
      )}
      <Fade
        in={!!lastSelectedGridItem}
        style={{ width: '100%', height: 'auto' }}
      >
        {lastSelectedGridItem && (
          <Box as="section" w={'100%'} h={'100%'}>
            <Flex as="header" alignItems={'center'}>
              <Text
                fontWeight={'bold'}
                my={4}
                textColor={'gray.900'}
                fontSize={'2xl'}
                textTransform={'uppercase'}
              >
                LINE {randomTokenId}
              </Text>
              <Text fontSize={'md'} textColor={'gray.500'} ml={2}>
                ({x}, {y})
              </Text>
            </Flex>
            <Flex
              justifyContent={'flex-start'}
              w={'100%'}
              h={'100%'}
              pb={isDrawer ? 2 : 0}
            >
              <TokenPreview
                // maxW={'300px'}
                // maxHeight={'80vh'}
                // minW={'300px'}
                maxW={isDrawer ? '65%' : { base: '50%', xl: '65%' }}
                // minW={'250px'}
                itemId={itemId}
                thumbnailsItems={highlightItems}
                isFixed={isFixed}
                flex={1}
                overflow={'hidden'}
              />
              <Box ml={8} minW={'170px'} mr={2}>
                <TextLine title={'Origin point'}>
                  {coordinatesToText(lastSelectedGridItem.index)}
                </TextLine>
                <TextLine
                  title={'Type'}
                  valueProps={{
                    textColor:
                      lastSelectedGridItem.direction === Direction.UP
                        ? 'red.600'
                        : 'cyan.600',
                  }}
                >
                  {lastSelectedGridItem.direction}
                </TextLine>
                <TextLine title={'Starting point'}>
                  {coordinatesToText(startingPoint)}
                </TextLine>
                <TextLine title={'Has Reached End'}>
                  {hasReachedEnd ? 'Yes' : 'No'}
                </TextLine>
                <TextLine title={'Is Locked'}>
                  {isFixed ? 'Yes' : 'No'}
                </TextLine>
                <TextLine title={'Number of Movements'}>{movements}</TextLine>
                <Link
                  href={getArweaveImageURL(lastSelectedGridItem.id)}
                  isExternal
                >
                  view image in new tab
                </Link>
              </Box>
            </Flex>
          </Box>
        )}
      </Fade>
    </Box>
  )
}
