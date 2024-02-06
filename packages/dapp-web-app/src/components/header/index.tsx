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
import Wallet from 'components/wallet'
import Link from 'next/link'
// import useMediaQuery from 'hooks/use-media-query'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLineCanMove } from 'services/web3/generated'
// import Grid from 'components/grid'
// import Wallet from 'components/wallet'
// import { isAfterStage, PageState } from 'utils/currentStage'

// let nav = isAfterStage(PageState.Released) ? [{ href: '/auction', label: 'auction' }] : []
const navLinks = [
  { href: '/', label: 'playground' },
  { href: '/move', label: '' },
  { href: '/about', label: 'about' },
]

const Header = ({ isDrawer = false }) => {
  const pathname = usePathname()
  const [nav, setNav] = useState(navLinks)
  const { data: canMove, isSuccess: isCanMoveSuccess } = useLineCanMove({
    watch: true,
  })
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [isMobile] = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    if (!isCanMoveSuccess) return
    const newNav = [...navLinks]
    if (!canMove) {
      newNav[1] = { href: '/auction', label: 'auction' }
    } else {
      newNav[1].label = 'tokens'
    }
    setNav(newNav)
  }, [canMove, isCanMoveSuccess])

  return (
    <Grid
      as="header"
      pt={6}
      pb={4}
      position="relative"
      zIndex={1}
      justifyContent={isDrawer ? 'center' : 'right'}
      my={isDrawer ? 8 : 0}
      pos={isDrawer ? 'static' : 'absolute'}
      bgColor={'white'}
      right={4}
      left={0}
    >
      <GridItem colSpan={isDrawer ? 1 : 10}>
        <Flex
          as="nav"
          display="flex"
          flexDir={isDrawer ? 'column' : 'row'}
          alignItems="center"
          justifyContent="flex-start"
          gap={isDrawer ? 6 : 0}
          h="full"
        >
          {nav.map((item, index) => {
            const isActive = pathname === item.href
            if (item.label === '') return

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
          <Wallet ml={6} isDrawer={isDrawer} />
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Header
