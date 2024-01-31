'use client'

import {
  Box,
  Button,
  Flex,
  Text,
  List,
  ListItem,
  Checkbox,
  Input,
  FormControl,
  FormLabel,
  Skeleton,
} from '@chakra-ui/react'
import { BsX } from 'react-icons/bs'

import { useTokensContext } from 'contexts/TokensContext'
import { Direction } from 'types/grid'
import { useEffect, useState } from 'react'
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

const TextLine = ({ children, title = '', direction, ...props }: any) => (
  <ListItem
    mb={1}
    bgColor={'gray.100'}
    px={1}
    display={'flex'}
    justifyContent={'space-between'}
    w={'100%'}
    {...props}
  >
    <Flex alignItems={'center'} gap={1}>
      <Text
        as={'span'}
        fontWeight={'bold'}
        textColor={direction === Direction.DOWN ? 'cyan.500' : 'red.500'}
        textTransform={'uppercase'}
        fontSize={'md'}
      >
        LINE #{title}
      </Text>{' '}
      <Text as={'span'} fontSize={'xs'} color={'gray.500'}>
        ({children})
      </Text>
    </Flex>
    <Button variant={'link'} onClick={() => {}} minW={'none'} ml={2}>
      <BsX size={16} color="gray.700" />
    </Button>
  </ListItem>
)
const merkleProof: Address[] = []
export function SidebarDetailed({ ...props }: any) {
  const { selectedItems, gridItemsState, toggleSelectedItem, resetSelection } =
    useTokensContext()
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
  useEffect(() => {
    if (mintPositionsTx.isSuccess || mintRandomTx.isSuccess) {
      setCounter(0)
      resetSelection()
    }

    // DONT ADD resetSelection to dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintPositionsTx.isSuccess, mintRandomTx.isSuccess])

  const handleRandomMint = () => {
    mintRandom.write({
      value: BigInt(counter) * currentPrice,
    })
  }

  const handleMintAtPositions = () => {
    const coordinates = selectedItems.map((coordinate) => {
      const [y, x] = coordinate.split('-')
      return { x: BigInt(x), y: BigInt(y) }
    })
    mintPositions.write({
      args: [coordinates, merkleProof],
      value: BigInt(coordinates.length) * currentPrice,
    })
  }

  return (
    <Skeleton isLoaded={startPrice !== 0n} {...props}>
      <Box {...props}>
        <Box as={'section'}>
          <AuctionBanner />
          {auctionState === AuctionState.STARTED && (
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
                    Current price
                  </Text>
                  <Text
                    fontSize={'lg'}
                    fontWeight={'bold'}
                    textColor={'gray.900'}
                  >
                    {formatToEtherStringBN(currentPrice)} ETH
                  </Text>
                </Flex>
                <Flex
                  bgColor={'gray.100'}
                  flexDirection={'column'}
                  py={1}
                  px={3}
                  flex={1}
                  mx={2}
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
                {maxSupply.toString()}.
              </Text>
            </>
          )}
        </Box>
        {auctionState === AuctionState.STARTED && (
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
                  <Text fontSize={'xs'} fontWeight={'bold'}>
                    Total:{' '}
                    {formatToEtherStringBN(
                      BigInt(selectedItems.length) * currentPrice,
                    )}{' '}
                    ETH
                  </Text>
                  <FormControl
                    alignItems={'flex-start'}
                    mt={2}
                    mb={1}
                    display={'flex'}
                  >
                    <Checkbox
                      colorScheme="gray"
                      mt={'2px'}
                      mr={2}
                      borderRadius={0}
                      rounded={'none'}
                      style={{ borderRadius: 0 }}
                      variant={'solid'}
                      isChecked
                    />
                    <FormLabel
                      fontSize={'xs'}
                      fontWeight={'normal'}
                      cursor={'pointer'}
                    >
                      I agree to mint available tokens and be refunded for
                      unavailable ones.
                    </FormLabel>
                  </FormControl>

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
                          ? 'Waiting for approval...'
                          : mintPositionsTx.isLoading
                            ? 'Processing...'
                            : ' Mint selected tokens'}
                      </Button>
                      <TxMessage
                        hash={mintPositions.data?.hash}
                        error={mintPositions.error as TransactionError}
                      />
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
                      onClick={() => setCounter(counter - 1)}
                    >
                      -
                    </Button>
                    <Input
                      htmlSize={4}
                      w={'40px'}
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
                      onChange={(e) => setCounter(Number(e.target.value))}
                    />
                    <Button
                      variant={'outline'}
                      mr={2}
                      onClick={() => setCounter(counter + 1)}
                    >
                      +
                    </Button>
                  </Flex>
                </Box>
                <Box ml={4} flex={2}>
                  <Text fontSize={'xs'} fontWeight={'bold'} mb={2}>
                    Total:{' '}
                    {formatToEtherStringBN(BigInt(counter) * currentPrice)} ETH
                  </Text>
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
                          ? 'Waiting for approval...'
                          : mintRandomTx.isLoading
                            ? 'Processing...'
                            : 'Random Mint'}
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
