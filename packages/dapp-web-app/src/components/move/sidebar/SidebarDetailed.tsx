'use client'

import { Box, Button, Flex, Link, SkeletonText, Text } from '@chakra-ui/react'
import { SidebarArrow } from 'components/arrow/SidebarArrow'

import { useMoveContext } from 'contexts/MoveContext'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import {
  useLineOwnerOf,
  useLineTokenUri,
  useLineWrite,
} from 'services/web3/generated'
import { getExternalOpenseaUrl } from 'utils/getLink'
import { shortenAddress } from 'utils/string'
import { contractAddresses } from '@dapp/contracts'
import { getChainId } from 'utils/chain'
import ChakraNextImageLoader from 'components/chakraNextImageLoader'
import { GridSize } from 'types/grid'
import { ArrowDirections, movementContractMap } from 'types/movements'
import { TRAITS } from 'types/nft'
import { getSpecificArrowMoveDirection } from 'components/arrow/utils'
import useMovePoint from 'hooks/useMovePoint'
import { TxMessage } from 'components/txMessage'
import { TransactionError } from 'types/transaction'
import { useWaitForTransaction } from 'wagmi'

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

export function SidebarDetailed({ ...props }: any) {
  const {
    gridItemsState,
    selectedGridItem,
    highlightGridItem,
    myItems,
    unavailableDirections,
  } = useMoveContext()
  const [arrowHover, setArrowHover] = useState<ArrowDirections | undefined>()
  const [arrowSelected, setArrowSelected] = useState<
    ArrowDirections | undefined
  >()
  const tokenData = useLineTokenUri({
    args: [BigInt(selectedGridItem?.id || 0)],
    enabled: !!selectedGridItem,
  })
  const tokenOwner = useLineOwnerOf({
    args: [BigInt(selectedGridItem?.id || 0)],
    enabled: !!selectedGridItem,
  })
  const { getMoveFunction, getCurrentMoveToCall } = useMovePoint()
  const moveTx = useWaitForTransaction({
    hash: getCurrentMoveToCall().data?.hash,
    enabled: getCurrentMoveToCall().data?.hash !== undefined,
    staleTime: 1_000,
  })

  const tokenJson = useMemo(() => {
    try {
      if (tokenData?.data) {
        const json = atob(tokenData?.data.substring(29))
        return JSON.parse(json)
      }
    } catch (error) {
      console.error(error)
    }
    return { attributes: [] }
  }, [tokenData?.data])

  const handleArrowMouseOver = (direction?: ArrowDirections) => {
    setArrowHover(direction)
  }
  const handleArrowOnClick = (direction: ArrowDirections) => {
    setArrowSelected(direction)
  }
  const handleMove = () => {
    const tokenDirection = tokenJson.attributes
      .find((attr: any) => attr.trait_type === TRAITS.DIRECTION)
      .value.toLowerCase()
    const pointDirection = getSpecificArrowMoveDirection(
      tokenDirection,
      arrowSelected!,
    )
    const moveFunction = getMoveFunction(pointDirection!)
    // console.log(
    //   'handleMove',
    //   selectedGridItem?.id,
    //   pointDirection,
    //   pointDirection && movementContractMap[pointDirection],
    // )
    moveFunction.write({
      args: [BigInt(selectedGridItem?.id || 0)],
    })
  }

  const highlightItems = useMemo(
    () => [
      selectedGridItem,
      ...highlightGridItem
        .map((item) => gridItemsState[item])
        .filter((item) => item),
    ],
    [gridItemsState, highlightGridItem, selectedGridItem],
  )

  const hideArrows = useMemo(() => {
    const [_, col] = selectedGridItem?.index?.split('-') ?? [0]
    if (Number(col) === GridSize - 1) {
      return [ArrowDirections.RIGHT, ArrowDirections.DIAGONAL_RIGHT]
    }
    if (Number(col) === 0) {
      return [ArrowDirections.LEFT, ArrowDirections.DIAGONAL_LEFT]
    }
  }, [selectedGridItem?.index])

  useEffect(() => {
    setArrowHover(undefined)
    setArrowSelected(undefined)
  }, [selectedGridItem])

  return (
    <Box w={'100%'} {...props}>
      <Box as={'section'}>
        {!selectedGridItem && (
          <>
            <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
              Select a token to move
            </Text>
            <Text fontSize={'xs'}>
              Your tokens and move possibilities are highlighted on the grid.
            </Text>
          </>
        )}
        {selectedGridItem && (
          <Box as="section" mt={4}>
            <Flex justifyContent={'flex-start'} flexShrink={2}>
              <Box maxW={'60%'}>
                <Flex as="header" alignItems={'center'} mb={4}>
                  <SkeletonText
                    noOfLines={1}
                    skeletonHeight="8"
                    fontWeight={'bold'}
                    textColor={'gray.900'}
                    fontSize={'2xl'}
                    textTransform={'uppercase'}
                    isLoaded={!!tokenJson.name}
                  >
                    {tokenJson.name}
                  </SkeletonText>
                  <Text fontSize={'md'} textColor={'gray.500'} ml={2}>
                    ({selectedGridItem.col},{selectedGridItem.row})
                  </Text>
                </Flex>
                <ChakraNextImageLoader
                  src={tokenJson.image}
                  alt={tokenJson.name}
                  width={400}
                  height={600}
                />
                {highlightItems.length > 0 && (
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    mt={2}
                    flexWrap={highlightItems.length > 6 ? 'wrap' : 'nowrap'}
                  >
                    {highlightItems.map((item) => {
                      return (
                        <Box
                          key={item!.index}
                          textAlign={'center'}
                          w={
                            highlightItems.length > 6
                              ? '23%'
                              : `${
                                  Math.floor(100 / highlightItems.length) - 1
                                }%`
                          }
                        >
                          <ChakraNextImageLoader
                            src={item!.image}
                            alt={`Token ${item!.index}`}
                            width={60}
                            height={180}
                          />
                          <Text fontSize={'11px'} mt={1}>
                            ({item!.index.replace('-', ',')})
                          </Text>
                        </Box>
                      )
                    })}
                  </Box>
                )}
              </Box>
              <Box ml={8} mt={2} flexShrink={1}>
                {myItems.includes(selectedGridItem.index) ? (
                  <>
                    <Box pos={'relative'} w={'full'} h={'45px'}>
                      <SidebarArrow
                        displayCircle
                        direction={selectedGridItem.direction}
                        isAvailable
                        handleOnClick={handleArrowOnClick}
                        handleMouseOver={handleArrowMouseOver}
                        selected={arrowSelected}
                        hovered={arrowHover}
                        disableArrows={unavailableDirections}
                        hideArrows={hideArrows}
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
                            ({selectedGridItem.col},{selectedGridItem.row})
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
                          <Text fontSize={'xs'}>(10,18)</Text>
                        </Box>
                      </Flex>
                    )}
                    <Button
                      variant={'solid'}
                      w={'full'}
                      mt={4}
                      mb={1}
                      onClick={handleMove}
                      isDisabled={
                        !arrowSelected ||
                        getCurrentMoveToCall().isLoading ||
                        moveTx.isLoading
                      }
                    >
                      {getCurrentMoveToCall().isLoading
                        ? 'Waiting for approval...'
                        : moveTx.isLoading
                          ? 'Processing...'
                          : 'Move'}
                    </Button>
                    <TxMessage
                      hash={getCurrentMoveToCall().data?.hash}
                      error={getCurrentMoveToCall().error as TransactionError}
                      successMessage="Token moved successfully!"
                    />
                  </>
                ) : (
                  <Box w={'full'} h={'45px'} />
                )}

                <SkeletonText
                  noOfLines={9}
                  skeletonHeight="5"
                  isLoaded={!!tokenJson.attributes}
                  mt={5}
                >
                  {tokenJson.attributes.map(
                    ({
                      trait_type,
                      value,
                    }: {
                      trait_type: string
                      value: string
                    }) => (
                      <TextLine key={trait_type} title={trait_type}>
                        {value}
                      </TextLine>
                    ),
                  )}
                  <TextLine title={'Owner'}>
                    {shortenAddress(tokenOwner.data)}
                  </TextLine>
                  <Link
                    href={getExternalOpenseaUrl(
                      contractAddresses[getChainId()].Line,
                      selectedGridItem.id?.toString(),
                    )}
                    isExternal
                    display={'block'}
                  >
                    View on Opensea
                  </Link>
                  <Link href={tokenJson.image} isExternal display={'block'}>
                    Preview in new tab
                  </Link>
                </SkeletonText>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  )
}
