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
import Image from 'next/image'
import { HamburgerIcon } from '@chakra-ui/icons'
import Link from 'next/link'
// import useMediaQuery from 'hooks/use-media-query'
import { usePathname } from 'next/navigation'
// import Grid from 'components/grid'
// import Wallet from 'components/wallet'
// import { isAfterStage, PageState } from 'utils/currentStage'

// let nav = isAfterStage(PageState.Released) ? [{ href: '/auction', label: 'auction' }] : []
const nav = [
  { href: '/auction', label: 'Auction' },
  { href: '/faq', label: 'Move' },
  { href: '/faq', label: 'Images' },
]

const Header = () => {
  const pathname = usePathname()
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isMobile] = useMediaQuery('(max-width: 767px)')

  return (
    <>
      <Grid as="header" py={8} position="relative" zIndex={10}>
        {/* <GridItem colSpan={{ base: 2, md: 2 }} color="black">
          <Link href="/">Line by Figure31</Link>
        </GridItem> */}
        <GridItem colSpan={{ base: 2, sm: 4, md: 10 }}>
          <Flex
            as="nav"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
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
                  mr={14}
                  ml={0}
                  _hover={{ color: 'gray.700' }}
                  color={isActive ? 'gray.700' : 'gray.600'}
                  // bgColor={'black'}
                  transition="ease"
                  transitionProperty="color"
                  transitionDuration="0.2s"
                >
                  <Text as="strong" fontSize="20px" lineHeight={'20px'}>
                    {item.label}
                  </Text>
                </Box>
              )
            })}
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default Header
