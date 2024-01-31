import { Box, Text, Link as ChakraLink, Button, Flex } from '@chakra-ui/react'
import { useAuctionContext } from 'contexts/AuctionContext'
import dayjs from 'dayjs'
import Link from 'next/link'
import { AuctionState } from 'types/auction'
import { formatEther } from 'viem'

export function AuctionBanner({ displayMintNow = false }) {
  const { startTime, startPrice, endPrice, maxSupply, auctionState } =
    useAuctionContext()
  const startDate = dayjs.unix(Number(startTime))

  if (auctionState === AuctionState.STARTED) {
    if (!displayMintNow) return null
    return (
      <Box as={'section'} bgColor={'gray.200'} p={4} mb={4}>
        <Text
          as={'h2'}
          fontWeight={'bold'}
          textColor={'gray.700'}
          fontSize={'lg'}
          textTransform={'uppercase'}
        >
          Auction is live!
        </Text>
        <Button as={Link} href={'/auction'} variant={'solid'} mt={2} w={'full'}>
          MINT NOW
        </Button>
      </Box>
    )
  }

  return (
    <Box as={'section'} bgColor={'gray.200'} p={4} mb={4}>
      <Text
        as={'h2'}
        fontWeight={'bold'}
        textColor={'gray.700'}
        fontSize={'lg'}
      >
        Minting opens {startDate.format('dddd, MMMM D, hh:mma')}.
      </Text>
      <Text fontSize={'xs'} my={1}>
        Linear dutch auction over 1 hour. Starting price of{' '}
        {formatEther(startPrice).toString()}ETH, resting price of{' '}
        {formatEther(endPrice).toString()} ETH, no rebate. Bidders can select
        specific tokens before minting or mint randomly. As soon as you place
        your bid your tokens will be minted. Supply of {maxSupply.toString()}.
      </Text>
      <ChakraLink href={'#'}>Add to calendar</ChakraLink>
    </Box>
  )
}
