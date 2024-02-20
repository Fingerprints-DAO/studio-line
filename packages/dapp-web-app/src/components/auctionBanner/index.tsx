import { Box, Text, Link as ChakraLink, Button } from '@chakra-ui/react'
import Countdown from 'components/countdown'
import { useAuctionContext } from 'contexts/AuctionContext'
import useCanMove from 'hooks/use-can-move'
import useCountdownTime from 'hooks/use-countdown-timer'
import Link from 'next/link'
import { AuctionState } from 'types/auction'
import { formatEther } from 'viem'

export function AuctionBanner({ displayMintNow = false }) {
  const { startPrice, endPrice, maxSupply, auctionState } = useAuctionContext()
  const { countdownInMili } = useCountdownTime()
  const { data: canMove, isSuccess: isCanMoveSuccess } = useCanMove()

  if (!isCanMoveSuccess || canMove) return null

  if (
    auctionState === AuctionState.STARTED ||
    auctionState === AuctionState.RESTING
  ) {
    if (!displayMintNow) return null
    return (
      <Box
        as={'section'}
        bgColor={'gray.200'}
        p={4}
        mb={4}
        display={'flex'}
        alignItems={'center'}
      >
        <Text
          as={'h2'}
          fontWeight={'bold'}
          textColor={'gray.700'}
          fontSize={'lg'}
          textTransform={'uppercase'}
          flex={3}
        >
          Auction is live!
        </Text>
        <Button
          as={Link}
          href={'/auction'}
          variant={'solid'}
          w={'full'}
          flex={1}
        >
          mint now
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
        Auction opens in <Countdown futureTimestamp={countdownInMili} />
      </Text>
      <Text fontSize={'xs'} my={1}>
        Linear dutch auction over 1 hour. Starting price of{' '}
        {formatEther(startPrice).toString()} ETH, resting price of{' '}
        {formatEther(endPrice).toString()} ETH, no rebate. Bidders can select
        specific tokens before minting or mint randomly. As soon as you place
        your bid your tokens will be minted. Supply of {maxSupply.toString()}.
      </Text>
      <ChakraLink
        href={'https://www.addevent.com/event/VX20075579'}
        isExternal
        fontSize={'sm'}
      >
        Add to calendar
      </ChakraLink>
    </Box>
  )
}
