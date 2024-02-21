import { Box, Text, Button } from '@chakra-ui/react'
import { useAuctionContext } from 'contexts/AuctionContext'
import useCanMove from 'hooks/use-can-move'
import Link from 'next/link'
import { AuctionState } from 'types/auction'

export function AuctionBanner({ displayMintNow = false }) {
  const { data: canMove, isSuccess: isCanMoveSuccess } = useCanMove()

  if (!isCanMoveSuccess) return null

  if (!canMove) {
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

  return null
}
