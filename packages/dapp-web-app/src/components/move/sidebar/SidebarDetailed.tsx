'use client'

import { useEffect, useMemo } from 'react'
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Link,
  SkeletonText,
  Text,
} from '@chakra-ui/react'

import { useMoveContext } from 'contexts/MoveContext'
import Image from 'next/image'
import {
  lineAddress,
  useLineLockAsStar,
  useLineOwnerOf,
  useLineTokenUri,
} from 'services/web3/generated'
import { getExternalOpenseaUrl, handleArweaveUrl } from 'utils/getLink'
import { shortenAddress } from 'utils/string'
import { contractAddresses } from '@dapp/contracts'
import { getChainId } from 'utils/chain'
import { LeftContent } from './LeftContent'
import { MoveSection } from './MoveSection'
import { useWaitForTransaction } from 'wagmi'
import { TxMessage } from 'components/txMessage'
import { TransactionError } from 'types/transaction'
import { TextLine } from 'components/textLine'
import { Direction } from 'types/grid'
import { useTransactionContext } from 'contexts/TransactionContext'

type SidebarDetailedProps = BoxProps & {
  handleFixMyToken?: () => void
  isDrawer?: boolean
}

export function SidebarDetailed({
  handleFixMyToken,
  isDrawer = false,
  ...props
}: SidebarDetailedProps) {
  const {
    selectedGridItem,
    myItems,
    toggleFixMyToken,
    fixTokenState,
    fixTokenSelected,
  } = useMoveContext()
  const { isSuccess, hash, error } = useTransactionContext()
  const tokenData = useLineTokenUri({
    args: [BigInt(selectedGridItem?.id ?? 0)],
    enabled: !!selectedGridItem?.id,
  })
  const tokenOwner = useLineOwnerOf({
    args: [BigInt(selectedGridItem?.id ?? 0)],
    enabled: !!selectedGridItem?.id,
  })
  const moveToPosition = useLineLockAsStar()
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

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        window.location.reload()
      }, 2_000)
    }
  }, [isSuccess])

  return (
    <Box w={'100%'} h={'100%'} {...props}>
      <Box as={'section'}>
        {!selectedGridItem && (
          <>
            <Text fontWeight={'bold'} mt={1} fontSize={'2xl'} as={'h1'}>
              Select a token to move
            </Text>
            <Text fontSize={'xs'}>
              Your tokens and move possibilities are highlighted on the grid.
            </Text>
          </>
        )}
        {selectedGridItem && (
          <Box w={'100%'} h={'100%'} mt={1}>
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
              <Box
                minW={'200px'}
                h={isDrawer ? 'auto' : '100%'}
                maxW={{ base: '100%', md: 'calc(100% - 200px)' }}
              >
                <LeftContent token={tokenJson} isDrawer={isDrawer} />
              </Box>
              <Box
                ml={isDrawer ? 0 : 8}
                minW={'170px'}
                maxW={'200px'}
                mr={2}
                mt={isDrawer ? 0 : 4}
                flexGrow={0}
              >
                {!selectedGridItem.isLocked &&
                myItems.includes(selectedGridItem.index) ? (
                  <>
                    {!fixTokenState && <MoveSection token={tokenJson} />}
                    {fixTokenState && (
                      <>
                        <Box maxW={isDrawer ? '' : '235px'}>
                          <Text fontSize={'sm'}>
                            {fixTokenSelected
                              ? 'Once you confirm, it will have 360º view and cannot be moved.'
                              : 'Please, select a point in the grid. Your token will be placed and cannot be moved.'}
                          </Text>
                        </Box>
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
                            ? 'waiting for approval...'
                            : moveTx.isLoading
                              ? 'processing...'
                              : 'confirm'}
                        </Button>
                        <Button
                          w={'full'}
                          mt={2}
                          mb={1}
                          onClick={toggleFixMyToken}
                          variant={'outline'}
                        >
                          go back
                        </Button>
                        <TxMessage
                          hash={moveToPosition.data?.hash}
                          error={moveTx.error as TransactionError}
                          successMessage="Moved! Reloading..."
                        />
                      </>
                    )}
                  </>
                ) : (
                  <Box w={'full'} h={'28px'} hidden={isDrawer} />
                )}

                {(isSuccess || hash || error) && (
                  <TxMessage
                    hash={hash}
                    error={error}
                    successMessage="Moved! Reloading..."
                  />
                )}
                <SkeletonText
                  noOfLines={9}
                  skeletonHeight="5"
                  isLoaded={!!tokenJson.attributes}
                  mt={isDrawer ? 2 : 5}
                  mb={4}
                >
                  {tokenJson.attributes.map(
                    ({
                      trait_type,
                      value,
                    }: {
                      trait_type: string
                      value: string
                    }) => (
                      <TextLine
                        key={trait_type}
                        title={trait_type}
                        valueProps={{
                          textColor:
                            trait_type === 'Type'
                              ? value.toLowerCase() === Direction.UP
                                ? 'red.600'
                                : 'cyan.600'
                              : '',
                        }}
                      >
                        {value}
                      </TextLine>
                    ),
                  )}
                  <TextLine title={'Owner'}>
                    {shortenAddress(tokenOwner.data)}
                  </TextLine>
                  <Link
                    href={getExternalOpenseaUrl(
                      lineAddress,
                      selectedGridItem.id?.toString(),
                    )}
                    isExternal
                    display={'block'}
                  >
                    view on opensea
                  </Link>
                  <Link
                    href={handleArweaveUrl(tokenJson.image)}
                    isExternal
                    display={'block'}
                  >
                    view image in new tab
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
