'use client'

import { Box, Button, Flex, Link, Text, Fade } from '@chakra-ui/react'
import { AuctionBanner } from 'components/auctionBanner'
import ChakraNextImageLoader from 'components/chakraNextImageLoader'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import { useHasReachedEnd } from 'hooks/use-has-reached-end'
import { GridSize, ImageSizes, generateImage } from 'types/grid'

const TextLine = ({ children, title = '', ...props }: any) => (
  <Text fontSize={'md'} color={'gray.500'} mb={1} {...props}>
    <Text as={'span'} fontWeight={'bold'} textColor={'gray.700'}>
      {title}:
    </Text>{' '}
    <Text as={'span'} textTransform={'capitalize'}>
      {children}
    </Text>
  </Text>
)

export function SidebarDetailed({ isDrawer = false, ...props }: any) {
  const {
    lastSelectedGridItem,
    resetGrid,
    highlightGridItem,
    gridItemsState,
    movements,
    originPoint,
    isFixed,
  } = usePlaygroundContext()
  const hasReachedEnd = useHasReachedEnd({
    row: lastSelectedGridItem?.row,
    direction: lastSelectedGridItem?.direction,
  })
  const itemId = lastSelectedGridItem
    ? lastSelectedGridItem.row * GridSize + lastSelectedGridItem.col
    : 0

  const highlightItems = highlightGridItem
    .map((item) => gridItemsState[item])
    .filter((item) => item)

  return (
    <Box {...props}>
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
      <Fade in={!!lastSelectedGridItem}>
        {lastSelectedGridItem && !isDrawer && (
          <Button variant={'outline'} my={4} onClick={resetGrid}>
            Reset playground
          </Button>
        )}
        {lastSelectedGridItem && (
          <Box as="section">
            <Flex as="header" alignItems={'center'}>
              <Text
                fontWeight={'bold'}
                my={4}
                textColor={'gray.900'}
                fontSize={'2xl'}
                textTransform={'uppercase'}
              >
                LINE #{itemId}
              </Text>
              <Text fontSize={'md'} textColor={'gray.500'} ml={2}>
                ({lastSelectedGridItem.index.replace('-', ',')})
              </Text>
            </Flex>
            <Flex justifyContent={'flex-start'}>
              <Box maxW={'55%'}>
                <ChakraNextImageLoader
                  src={generateImage(itemId, ImageSizes.LARGE)}
                  alt={`Token ${lastSelectedGridItem.index}`}
                  width={858}
                  height={1298}
                  style={{ maxWidth: '100%' }}
                />
                {highlightItems.length > 0 && (
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    mt={2}
                    flexWrap={highlightItems.length > 5 ? 'wrap' : 'nowrap'}
                  >
                    {highlightItems.map((item) => {
                      return (
                        <Box
                          key={item.index}
                          textAlign={'center'}
                          w={
                            highlightItems.length > 5
                              ? '23%'
                              : `${
                                  Math.floor(100 / highlightItems.length) - 1
                                }%`
                          }
                        >
                          <ChakraNextImageLoader
                            src={item.image}
                            alt={`Token ${item.index}`}
                            width={104}
                            height={157}
                            style={{ width: '100%' }}
                          />
                          <Text fontSize={'xs'} mt={1} mb={isFixed ? 2 : 0}>
                            ({item.index.replace('-', ',')})
                          </Text>
                        </Box>
                      )
                    })}
                  </Box>
                )}
              </Box>
              <Box ml={8} flexShrink={0}>
                <TextLine title={'Origin point'}>
                  {originPoint.replace('-', ',')}
                </TextLine>
                <TextLine title={'Image point'}>
                  {lastSelectedGridItem.index.replace('-', ',')}
                </TextLine>
                <TextLine title={'Type'}>
                  {lastSelectedGridItem.direction}
                </TextLine>
                <TextLine title={'Starting point'}>
                  {lastSelectedGridItem.index.replace('-', ',')}
                </TextLine>
                <TextLine title={'Has Reached End'}>
                  {hasReachedEnd ? 'Yes' : 'No'}
                </TextLine>
                <TextLine title={'Is Locked'}>
                  {isFixed ? 'Yes' : 'No'}
                </TextLine>
                <TextLine title={'Number of Movements'}>{movements}</TextLine>
                <Link href={lastSelectedGridItem.image} isExternal>
                  Preview in new tab
                </Link>
              </Box>
            </Flex>
          </Box>
        )}
      </Fade>
    </Box>
  )
}
