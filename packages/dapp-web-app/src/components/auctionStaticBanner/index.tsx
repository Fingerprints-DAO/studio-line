import { Box, Text, Link as ChakraLink, BoxProps } from '@chakra-ui/react'

export function AuctionStaticBanner(bannerProps: BoxProps) {
  return (
    <Box as={'section'} bgColor={'gray.200'} p={4} mb={4} {...bannerProps}>
      <Text
        as={'h2'}
        fontWeight={'bold'}
        textColor={'gray.700'}
        fontSize={'lg'}
      >
        Minting opens on February 21 at 10 AM PT / 1 PM ET / 7 PM CET.
      </Text>
      <Text fontSize={'xs'} my={1}>
        60-minute Dutch auction. Starting price of 1.0 ETH, resting price of
        0.15 ETH, <b>no rebate</b>. Bidders can select specific tokens before
        minting or mint randomly. As soon as you place your bid your tokens will
        be minted. Supply of 250 tokens.
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
