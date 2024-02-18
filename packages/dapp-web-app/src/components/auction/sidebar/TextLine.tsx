import {
  Button,
  ComponentDefaultProps,
  Flex,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { BsX } from 'react-icons/bs'
import { Direction } from 'types/grid'

export const TextLine = ({
  children,
  title = '',
  direction,
  ...props
}: ComponentDefaultProps & {
  title: string | number | null
  direction: Direction | null
}) => (
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
        LINE {title}
      </Text>{' '}
      {/* <Text as={'span'} fontSize={'xs'} color={'gray.500'}>
        ({children})
      </Text> */}
    </Flex>
    <Button variant={'link'} onClick={() => {}} minW={'none'} ml={2}>
      <BsX size={16} color="gray.700" />
    </Button>
  </ListItem>
)
