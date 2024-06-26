import { Flex, Text } from '@chakra-ui/react'

const GridNumber = ({ number = 0, isColumn = false, ...props }) => (
  <Flex
    pos={'absolute'}
    left={isColumn ? '-140%' : undefined}
    bottom={isColumn ? undefined : '-100%'}
    flexDir={isColumn ? 'column' : 'row'}
    alignItems={'center'}
    justifyContent={'center'}
    textColor={'gray.900'}
    {...props}
  >
    <Text fontSize={{ base: '6px', md: '10px' }}>{number}</Text>
  </Flex>
)

export default GridNumber
