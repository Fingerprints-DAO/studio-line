'use client'

import {
  Box,
  Button,
  Flex,
  Text,
  List,
  ListItem,
  Input,
  Skeleton,
} from '@chakra-ui/react'
import { BsX } from 'react-icons/bs'

import { useTokensContext } from 'contexts/TokensContext'
import { Direction } from 'types/grid'
import { useEffect, useMemo, useState } from 'react'
import { AuctionState } from 'types/auction'
import { formatToEtherStringBN } from 'utils/price'
import useCountdownTime from 'hooks/use-countdown-timer'
import Countdown from 'components/countdown'
import { useAuctionContext } from 'contexts/AuctionContext'
import { AuctionBanner } from 'components/auctionBanner'
import {
  useLineMintAtPosition,
  useLineMintRandom,
} from 'services/web3/generated'
import { Address, formatEther } from 'viem'
import { useWaitForTransaction } from 'wagmi'
import ForceConnectButton from 'components/forceConnectButton'
import { TransactionError } from 'types/transaction'
import { TxMessage } from 'components/txMessage'
import { useDiscount } from 'hooks/use-discount'
import TotalPriceDisplay from './TotalPriceDisplay'
import { TextLine } from './TextLine'

export function SidebarDetailed({ ...props }: any) {
  const {
    selectedItems,
    gridItemsState,
    toggleSelectedItem,
    resetSelection,
    limitPerTx,
    reachedLimit,
  } = useTokensContext()
  const {
    startPrice,
    endPrice,
    currentPrice,
    minted,
    maxSupply,
    auctionState,
  } = useAuctionContext()
  const [counter, setCounter] = useState(0)
  const { countdownInMili } = useCountdownTime()
  const { value: discountValue, hasDiscount, merkleProof } = useDiscount()
  const mintRandom = useLineMintRandom({
    args: [BigInt(counter), merkleProof],
  })
  const mintPositions = useLineMintAtPosition()
  const mintRandomTx = useWaitForTransaction({
    hash: mintRandom.data?.hash,
    enabled: mintRandom.data?.hash !== undefined,
    staleTime: 1_000,
  })
  const mintPositionsTx = useWaitForTransaction({
    hash: mintPositions.data?.hash,
    enabled: mintPositions.data?.hash !== undefined,
    staleTime: 1_000,
  })
  const price = useMemo(() => {
    if (!hasDiscount || discountValue === 0 || discountValue === null)
      return currentPrice

    return currentPrice - (currentPrice * BigInt(discountValue)) / 100n
  }, [currentPrice, discountValue, hasDiscount])

  const availableToMint = useMemo(() => {
    const available = Number(maxSupply - minted)
    return available > limitPerTx ? limitPerTx : available
  }, [limitPerTx, maxSupply, minted])

  const handleRandomMint = () => {
    mintRandom.write({
      value: BigInt(counter) * price,
    })
  }

  const handleMintAtPositions = () => {
    const coordinates = selectedItems.map((coordinate) => {
      const [y, x] = coordinate.split('-')
      return { x: BigInt(x), y: BigInt(y) }
    })

    mintPositions.write({
      args: [coordinates, merkleProof],
      value: BigInt(coordinates.length) * price,
    })
  }
  const handlerCounter = (value: number) => {
    if (value < 0) return
    if (value > availableToMint) {
      setCounter(availableToMint)
      return
    }
    setCounter(value)
  }

  useEffect(() => {
    if (mintPositionsTx.isSuccess || mintRandomTx.isSuccess) {
      setCounter(0)
      resetSelection()
    }

    // DONT ADD resetSelection to dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintPositionsTx.isSuccess, mintRandomTx.isSuccess])

  return (
    <Skeleton isLoaded={startPrice !== 0n} {...props}>
      <Box {...props}>
        <Box>
          <AuctionBanner />
          {(auctionState === AuctionState.STARTED ||
            auctionState === AuctionState.RESTING) && (
            <>
              <Flex justifyContent={'space-between'}>
                <Flex
                  bgColor={'gray.100'}
                  flexDirection={'column'}
                  py={1}
                  px={3}
                  flex={1}
                >
                  <Text
                    fontSize={'xs'}
                    fontWeight={'bold'}
                    textColor={'gray.500'}
                  >
                    {auctionState === AuctionState.RESTING
                      ? 'Resting price'
                      : 'Current price'}
                  </Text>
                  <Text
                    as={'div'}
                    fontSize={'lg'}
                    fontWeight={'bold'}
                    textColor={'gray.900'}
                  >
                    {hasDiscount && (
                      <Flex alignItems={'center'}>
                        <Text
                          textColor={'gray.400'}
                          textDecor={'line-through'}
                          fontSize={'xs'}
                        >
                          {formatToEtherStringBN(currentPrice)} ETH
                        </Text>
                        <Text
                          ml={2}
                          bgColor={'gray.500'}
                          textColor={'gray.50'}
                          px={1}
                          fontSize={'x-small'}
                        >
                          -{discountValue}%
                        </Text>
                      </Flex>
                    )}
                    {formatToEtherStringBN(price)} ETH
                  </Text>
                </Flex>
                {auctionState !== AuctionState.RESTING && (
                  <Flex
                    flexDirection={'column'}
                    justifyContent={'center'}
                    bgColor={'gray.100'}
                    py={1}
                    px={3}
                    ml={2}
                    flex={1}
                  >
                    <Text
                      fontSize={'xs'}
                      fontWeight={'bold'}
                      textColor={'gray.500'}
                    >
                      Remaining time
                    </Text>
                    <Text
                      fontSize={'lg'}
                      fontWeight={'bold'}
                      textColor={'gray.900'}
                    >
                      <Countdown futureTimestamp={countdownInMili} />
                    </Text>
                  </Flex>
                )}

                <Flex
                  flexDirection={'column'}
                  justifyContent={'center'}
                  bgColor={'gray.100'}
                  py={1}
                  px={3}
                  ml={2}
                  flex={1}
                >
                  <Text
                    fontSize={'xs'}
                    fontWeight={'bold'}
                    textColor={'gray.500'}
                  >
                    Minted/Available
                  </Text>
                  <Text
                    fontSize={'lg'}
                    fontWeight={'bold'}
                    textColor={'gray.900'}
                  >
                    {Number(minted)}/{Number(maxSupply)}
                  </Text>
                </Flex>
              </Flex>
              <Text fontSize={'xs'} color={'gray.500'} mt={2} mb={6}>
                Linear dutch auction over 1 hour. Starting price of{' '}
                {formatEther(startPrice).toString()}ETH, resting price of{' '}
                {formatEther(endPrice).toString()} ETH, no rebate. Bidders can
                select specific tokens before minting or mint randomly. As soon
                as you place your bid your tokens will be minted. Supply of{' '}
                {maxSupply.toString()}. Limit per transaction: {limitPerTx}{' '}
                tokens.
              </Text>
            </>
          )}
        </Box>
        {(auctionState === AuctionState.STARTED ||
          auctionState === AuctionState.RESTING) && (
          <>
            <Box as={'section'}>
              <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
                Select tokens on the grid
              </Text>
              <Flex mt={4} justifyContent={'space-between'} shrink={0} flex={1}>
                <Box minW={'30%'}>
                  <Text fontSize={'xs'} fontWeight={'bold'}>
                    Selected tokens
                  </Text>
                  <List spacing={2} mt={2}>
                    {selectedItems.length > 0 &&
                      selectedItems
                        .map((item) => gridItemsState[item])
                        .map((item) => (
                          <TextLine
                            key={item.id}
                            title={item.id}
                            direction={item.direction}
                            onClick={() => toggleSelectedItem(item.index)}
                          >
                            {item.index.replace('-', ',')}
                          </TextLine>
                        ))}
                  </List>
                </Box>
                <Box ml={4} flex={2}>
                  <TotalPriceDisplay
                    selectedItemsCount={selectedItems.length}
                    currentPrice={currentPrice}
                    hasDiscount={hasDiscount}
                    price={price}
                  />
                  <Text fontSize={'xs'} fontWeight={'normal'} my={2}>
                    Unavailable tokens for minting will be refunded in the same
                    transaction.
                  </Text>

                  <ForceConnectButton buttonText="Connect to mint">
                    <>
                      <Button
                        variant={'solid'}
                        w={'full'}
                        onClick={handleMintAtPositions}
                        isDisabled={
                          selectedItems.length < 1 ||
                          mintPositions.isLoading ||
                          mintPositionsTx.isLoading
                        }
                      >
                        {mintPositions.isLoading
                          ? 'waiting for approval...'
                          : mintPositionsTx.isLoading
                            ? 'processing...'
                            : ' mint selected tokens'}
                      </Button>
                      <TxMessage
                        hash={mintPositions.data?.hash}
                        error={mintPositions.error as TransactionError}
                      />
                      {reachedLimit && (
                        <Text fontSize={'xs'} color={'red.500'} mt={2}>
                          You have reached the limit per transaction:{' '}
                          {limitPerTx} tokens.
                        </Text>
                      )}
                    </>
                  </ForceConnectButton>
                </Box>
              </Flex>
            </Box>
            <Text fontSize={'md'} fontWeight={'bold'} mt={4}>
              or
            </Text>
            <Box as={'section'}>
              <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
                Random mint
              </Text>
              <Flex mt={4} justifyContent={'space-between'} shrink={0} flex={1}>
                <Box minW={'30%'}>
                  <Text fontSize={'xs'} fontWeight={'bold'} mb={2}>
                    Quantity
                  </Text>
                  <Flex>
                    <Button
                      variant={'outline'}
                      mr={2}
                      onClick={() => handlerCounter(counter - 1)}
                    >
                      -
                    </Button>
                    <Input
                      htmlSize={4}
                      w={'40px'}
                      height={8}
                      p={1}
                      textAlign={'center'}
                      mr={2}
                      colorScheme="blackAlpha"
                      focusBorderColor={'gray.900'}
                      _hover={{ borderColor: 'gray.900' }}
                      color={'gray.700'}
                      fontWeight={'bold'}
                      fontSize={'md'}
                      borderColor={'gray.900'}
                      borderRadius={'none'}
                      borderWidth={'2px'}
                      value={counter}
                      onChange={(e) => handlerCounter(Number(e.target.value))}
                    />
                    <Button
                      variant={'outline'}
                      mr={2}
                      onClick={() => handlerCounter(counter + 1)}
                    >
                      +
                    </Button>
                  </Flex>
                </Box>
                <Box ml={4} flex={2}>
                  <Box mb={2}>
                    <TotalPriceDisplay
                      selectedItemsCount={counter}
                      currentPrice={currentPrice}
                      hasDiscount={hasDiscount}
                      price={price}
                    />
                  </Box>
                  <ForceConnectButton buttonText="Connect to mint">
                    <>
                      <Button
                        variant={'solid'}
                        w={'full'}
                        isDisabled={
                          counter < 1 ||
                          mintRandom.isLoading ||
                          mintRandomTx.isLoading
                        }
                        onClick={handleRandomMint}
                      >
                        {mintRandom.isLoading
                          ? 'waiting for approval...'
                          : mintRandomTx.isLoading
                            ? 'processing...'
                            : 'random Mint'}
                      </Button>
                      <TxMessage
                        hash={mintRandom.data?.hash}
                        error={mintRandom.error as TransactionError}
                      />
                    </>
                  </ForceConnectButton>
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </Skeleton>
  )
}
