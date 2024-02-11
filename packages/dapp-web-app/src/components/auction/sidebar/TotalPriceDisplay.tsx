import { Box, Text } from '@chakra-ui/react'
import { formatToEtherStringBN } from 'utils/price'

interface TotalPriceDisplayProps {
  selectedItemsCount: number
  currentPrice: bigint
  hasDiscount: boolean
  price: bigint
}

const TotalPriceDisplay: React.FC<TotalPriceDisplayProps> = ({
  selectedItemsCount,
  currentPrice,
  hasDiscount,
  price,
}) => {
  const itemCount = BigInt(selectedItemsCount)
  const totalPrice = formatToEtherStringBN(itemCount * currentPrice)
  const discountedPrice = formatToEtherStringBN(itemCount * price)
  const showDiscount = hasDiscount && itemCount > 0

  return (
    <Box fontSize={'xs'} fontWeight={'bold'}>
      Total:{' '}
      <Text
        as={'span'}
        textDecor={showDiscount ? 'line-through' : 'none'}
        textColor={showDiscount ? 'gray.400' : 'gray.900'}
      >
        {totalPrice} ETH
      </Text>{' '}
      {showDiscount && (
        <Text as={'span'} textColor={'gray.900'}>
          {discountedPrice} ETH
        </Text>
      )}
    </Box>
  )
}

export default TotalPriceDisplay
