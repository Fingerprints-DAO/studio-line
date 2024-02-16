'use client'

import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Fade,
  TextProps,
} from '@chakra-ui/react'
import { AuctionBanner } from 'components/auctionBanner'
import { TokenPreview } from 'components/tokenPreview'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import { useCoordinates } from 'hooks/use-coordinates'
import { useHasReachedEnd } from 'hooks/use-has-reached-end'
import { useMemo } from 'react'
import { Direction, GridSize } from 'types/grid'
import { getArweaveImageURL } from 'utils/getLink'
import { coordinatesToText } from 'utils/handleCoordinates'

const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 250)
}

type TextLineProps = TextProps & {
  valueProps?: TextProps
}
const TextLine = ({
  children,
  title = '',
  valueProps = {},
  ...props
}: TextLineProps) => (
  <Text
    fontSize={'md'}
    color={'gray.500'}
    mb={1}
    textTransform={'lowercase'}
    {...props}
  >
    <Text as={'span'} fontWeight={'bold'} textColor={'gray.700'}>
      {title}:
    </Text>{' '}
    <Text as={'span'} textTransform={'lowercase'} {...valueProps}>
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
                LINE {randomTokenId}
              </Text>
              <Text fontSize={'md'} textColor={'gray.500'} ml={2}>
                ({x}, {y})
              </Text>
            </Flex>
            <Flex justifyContent={'flex-start'}>
              <TokenPreview
                maxW={'55%'}
                itemId={itemId}
                thumbnailsItems={highlightItems}
                isFixed={isFixed}
              />
              <Box ml={8} flexShrink={0}>
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
