'use client'

import { Box, Flex, Link, Text, Fade } from '@chakra-ui/react'
import { AuctionBanner } from 'components/auctionBanner'
import { AuctionStaticBanner } from 'components/auctionStaticBanner'
import { TextLine } from 'components/textLine'
import { TokenPreview } from 'components/tokenPreview'
import { AuctionProvider } from 'contexts/AuctionContext'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import { useCoordinates } from 'hooks/use-coordinates'
import { useHasReachedEnd } from 'hooks/use-has-reached-end'
import { useEffect, useMemo, useState } from 'react'
import { Direction, GridSize } from 'types/grid'
import { getArweaveImageURL } from 'utils/getLink'
import { coordinatesToText } from 'utils/handleCoordinates'

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 250)
}

export function SidebarDetailed({ isDrawer = false, ...props }: any) {
  const [hideBanner, setHideBanner] = useState(false)
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

  useEffect(() => {
    if (lastSelectedGridItem) {
      setHideBanner(true)
    }
  }, [lastSelectedGridItem])
  return (
    <Box w={'100%'} h={'100%'} {...props}>
      {!lastSelectedGridItem && (
        <>
          {/* {!hideBanner && <AuctionStaticBanner mb={4} />} */}
          <AuctionProvider>
            <AuctionBanner displayMintNow />
          </AuctionProvider>
          <Text fontWeight={'bold'} fontSize={'2xl'} as={'h1'} mt={'-5px'}>
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
          <Box as="section" w={'100%'} h={'100%'} mt={'-8px'}>
            <Flex as="header" alignItems={'center'} mb={4}>
              <Text
                fontWeight={'bold'}
                // mb={4}
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
              h={'calc(100vh - 150px)'}
              maxH={'900px'}
              display={'flex'}
              flexDirection={'column'}
              // bgColor={'red.100'}
              pb={isDrawer ? 2 : 0}
              flexDir={isDrawer ? 'column' : 'row'}
              gap={isDrawer ? 4 : 0}
            >
              <TokenPreview
                // maxW={'300px'}
                // maxHeight={'80vh'}
                // maxW={'330px'}
                // w={isDrawer ? '65%' : { base: '50%', xl: '45%' }}
                // minW={'250px'}
                minW={'200px'}
                h={isDrawer ? 'auto' : '100%'}
                itemId={itemId}
                thumbnailsItems={highlightItems}
                isFixed={isFixed}
                maxW={{ base: '100%', md: 'calc(100% - 200px)' }}
                // flex={2}
                // overflow={'hidden'}
              />
              <Box
                ml={isDrawer ? 0 : 8}
                minW={'170px'}
                mr={2}
                pb={isDrawer ? 4 : 0}
              >
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
                <TextLine title={'Is Star'}>{isFixed ? 'Yes' : 'No'}</TextLine>
                <TextLine title={'movements'}>{movements}</TextLine>
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
