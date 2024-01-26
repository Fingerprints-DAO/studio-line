import { Flex, Text } from '@chakra-ui/react'

const GridNumber = ({ number = 0, isColumn = false, ...props }) => (
  <Flex
    pos={'absolute'}
    left={isColumn ? '-140%' : undefined}
    bottom={isColumn ? undefined : '-100%'}
    flexDir={isColumn ? 'column' : 'row'}
    alignItems={'center'}
    justifyContent={'center'}
    {...props}
  >
    <Text fontSize={'10px'}>{number}</Text>
  </Flex>
)

export default GridNumber
