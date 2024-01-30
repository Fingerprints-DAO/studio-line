'use client'

import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Image as ChackraImage,
  List,
  ListItem,
  Checkbox,
  Input,
  FormControl,
  FormLabel,
  Skeleton,
} from '@chakra-ui/react'
import { BsX } from 'react-icons/bs'

import { useAuctionContext } from 'contexts/AuctionContext'
import { Direction } from 'types/grid'
import { useState } from 'react'
import { useLineConfig } from 'services/web3/generated'
import dayjs from 'dayjs'
import { formatEther, parseEther } from 'viem'
import { AuctionState } from 'types/auction'
import {
  formatBigNumberUp,
  formatToEtherString,
  formatToEtherStringBN,
  roundEtherUp,
} from 'utils/price'
import { NumberSettings } from 'types/number-settings'
import useCountdownTime from 'hooks/use-countdown-timer'
import Countdown from 'components/countdown'

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

export function SidebarDetailed({ ...props }: any) {
  const {
    selectedItems,
    gridItemsState,
    toggleSelectedItem,
    auctionConfig,
    auctionState,
    auctionData,
  } = useAuctionContext()
  const [counter, setCounter] = useState(1)
  const { countdown, countdownInMili } = useCountdownTime()
  const startDate = dayjs.unix(Number(auctionConfig.startTime))
  console.log(auctionConfig, auctionData)

  return (
    <Skeleton isLoaded={auctionConfig.startPrice !== 0n} {...props}>
      <Box {...props}>
        <Box as={'section'}>
          {auctionState === AuctionState.NOT_STARTED && (
            <Box as={'section'} bgColor={'gray.200'} p={4} mb={4}>
              <Text
                as={'h2'}
                fontWeight={'bold'}
                textColor={'gray.700'}
                fontSize={'lg'}
              >
                Minting opens {startDate.format('dddd, MMMM D, HH:mm')}.
              </Text>
              <Text fontSize={'xs'} my={1}>
                Descending dutch auction over 1 hour. Starting price of{' '}
                {formatEther(auctionConfig.startPrice).toString()}ETH, resting
                price of {formatEther(auctionConfig.endPrice).toString()} ETH,
                no rebate. Bidders can select specific tokens before minting or
                mint randomly. As soon as you place your bid your tokens will be
                minted. Supply of {auctionData.maxSupply.toString()}.
              </Text>
              <Link href={'#'}>Add to calendar</Link>
            </Box>
          )}

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
                    {formatToEtherStringBN(auctionData.price)} ETH
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
                    Available/minted
                  </Text>
                  <Text
                    fontSize={'lg'}
                    fontWeight={'bold'}
                    textColor={'gray.900'}
                  >
                    {Number(auctionData.minted)}/{Number(auctionData.maxSupply)}
                  </Text>
                </Flex>
              </Flex>
              <Text fontSize={'xs'} color={'gray.500'} mt={2} mb={6}>
                <b>Linear dutch auction over 1 hour</b>.{' '}
                <b>Starting price of 1ETH</b>,{' '}
                <b>resting price of 0.2 ETH, no rebate</b>. Bidders can select
                specific tokens before minting or mint randomly. As soon as you
                place your bid your tokens will be minted. <b>Supply of 200</b>.
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
              {selectedItems.length > 0 && (
                <Flex
                  mt={4}
                  justifyContent={'space-between'}
                  shrink={0}
                  flex={1}
                >
                  <Box>
                    <Text fontSize={'xs'} fontWeight={'bold'}>
                      Selected tokens
                    </Text>
                    <List spacing={2} mt={2}>
                      {selectedItems
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
                      Total: 1.69 ETH
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
                    <Button variant={'solid'} w={'full'}>
                      Mint selected tokens
                    </Button>
                  </Box>
                </Flex>
              )}
            </Box>
            <Text fontSize={'md'} fontWeight={'bold'} mt={4}>
              or
            </Text>
            <Box as={'section'}>
              <Text fontWeight={'bold'} mt={4} fontSize={'2xl'} as={'h1'}>
                Random mint
              </Text>
              <Flex mt={4} justifyContent={'space-between'} shrink={0} flex={1}>
                <Box>
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
                    Total: 1.69 ETH
                  </Text>
                  <Button variant={'solid'} w={'full'}>
                    Random Mint
                  </Button>
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </Skeleton>
  )
}
