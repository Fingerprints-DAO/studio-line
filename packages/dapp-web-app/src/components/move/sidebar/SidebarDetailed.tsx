'use client'

import { useEffect, useMemo } from 'react'
import { Box, Button, Flex, Link, SkeletonText, Text } from '@chakra-ui/react'

import { useMoveContext } from 'contexts/MoveContext'
import Image from 'next/image'
import {
  useLineLockOriginPoint,
  useLineOwnerOf,
  useLineTokenUri,
} from 'services/web3/generated'
import { getExternalOpenseaUrl } from 'utils/getLink'
import { shortenAddress } from 'utils/string'
import { contractAddresses } from '@dapp/contracts'
import { getChainId } from 'utils/chain'
import { LeftContent } from './LeftContent'
import { MoveSection } from './MoveSection'
import { useWaitForTransaction } from 'wagmi'
import { TxMessage } from 'components/txMessage'
import { TransactionError } from 'types/transaction'

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
    selectedGridItem,
    myItems,
    toggleFixMyToken,
    fixTokenState,
    fixTokenSelected,
  } = useMoveContext()
  const tokenData = useLineTokenUri({
    args: [BigInt(selectedGridItem?.id ?? 0)],
    enabled: !!selectedGridItem?.id,
  })
  const tokenOwner = useLineOwnerOf({
    args: [BigInt(selectedGridItem?.id ?? 0)],
    enabled: !!selectedGridItem?.id,
  })
  const moveToPosition = useLineLockOriginPoint()
  const moveTx = useWaitForTransaction({
    hash: moveToPosition.data?.hash,
    enabled: moveToPosition.data?.hash !== undefined,
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

  const lockOriginPoint = () => {
    if (!fixTokenSelected || fixTokenSelected.length < 1) return
    const [y, x] = fixTokenSelected?.split('-')

    moveToPosition.write({
      args: [BigInt(selectedGridItem?.id ?? 0), BigInt(x), BigInt(y)],
    })
  }

  useEffect(() => {
    if (moveTx.isSuccess) {
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }, [moveTx.isSuccess])

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
                <LeftContent token={tokenJson} />
              </Box>
              <Box ml={8} mt={2} flexShrink={1}>
                {!selectedGridItem.isLocked &&
                myItems.includes(selectedGridItem.index) ? (
                  <>
                    {!fixTokenState && <MoveSection token={tokenJson} />}
                    {fixTokenState && (
                      <>
                        <Text fontSize={'sm'}>
                          {fixTokenSelected
                            ? 'Once you confirm, it will have 360º view and cannot be moved.'
                            : 'Please, select a point in the grid. Your token will be placed and cannot be moved.'}
                        </Text>
                        {fixTokenSelected && (
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
                              <Text fontSize={'xs'}>
                                (
                                {fixTokenSelected
                                  ?.split('-')
                                  .reverse()
                                  .join(',')}
                                )
                              </Text>
                            </Box>
                          </Flex>
                        )}
                        <Button
                          w={'full'}
                          mt={4}
                          mb={1}
                          onClick={lockOriginPoint}
                          isDisabled={
                            !fixTokenSelected ||
                            moveTx.isLoading ||
                            moveToPosition.isLoading
                          }
                          colorScheme="purple"
                          bgColor={'purple.600'}
                          borderColor={'purple.600'}
                          _hover={{
                            color: 'purple.600',
                            borderColor: 'purple.600',
                            backgroundColor: 'white',
                          }}
                        >
                          {moveToPosition.isLoading
                            ? 'Waiting for approval...'
                            : moveTx.isLoading
                              ? 'Processing...'
                              : 'Confirm'}
                        </Button>
                        <Button
                          w={'full'}
                          mt={4}
                          mb={1}
                          onClick={toggleFixMyToken}
                          variant={'outline'}
                        >
                          Go Back
                        </Button>
                        <TxMessage
                          hash={moveToPosition.data?.hash}
                          error={moveTx.error as TransactionError}
                          successMessage="Token moved successfully! Reloading the page..."
                        />
                      </>
                    )}
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
