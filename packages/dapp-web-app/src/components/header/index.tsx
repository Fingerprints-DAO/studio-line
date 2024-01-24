'use client'

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
// import useMediaQuery from 'hooks/use-media-query'
import { usePathname } from 'next/navigation'
// import Grid from 'components/grid'
// import Wallet from 'components/wallet'
// import { isAfterStage, PageState } from 'utils/currentStage'

// let nav = isAfterStage(PageState.Released) ? [{ href: '/auction', label: 'auction' }] : []
const nav = [
  { href: '/', label: 'playground' },
  { href: '/auction', label: 'auction' },
  { href: '/about', label: 'about' },
]

const Header = () => {
  const pathname = usePathname()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isMobile] = useMediaQuery('(max-width: 767px)')

  return (
    <Grid
      as="header"
      py={2}
      position="relative"
      zIndex={1}
      justifyContent={'right'}
    >
      <GridItem colSpan={{ base: 2, sm: 4, md: 10 }}>
        <Flex
          as="nav"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          h="full"
        >
          {nav.map((item, index) => {
            const isActive = pathname === item.href

            return (
              <Box
                key={index}
                as={Link}
                href={item.href}
                title={item.label}
                mr={0}
                ml={6}
                _hover={{ color: 'cyan.500' }}
                color={isActive ? 'cyan.500' : 'gray.900'}
                transition="ease"
                transitionProperty="color"
                transitionDuration="0.2s"
              >
                <Text as="strong" fontSize="16px" lineHeight={'16px'}>
                  {item.label}
                </Text>
              </Box>
            )
          })}
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Header
