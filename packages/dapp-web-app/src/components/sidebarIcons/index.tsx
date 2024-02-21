'use client'

import React from 'react'
import {
  ComponentDefaultProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import Header from 'components/header'
import Footer from 'components/footer'
import { AuctionStaticBanner } from 'components/auctionStaticBanner'

export default function SidebarIcons({
  additionalNav,
  ...props
}: ComponentDefaultProps & {
  additionalNav?: React.ReactNode
}) {
  const {
    isOpen: navIsOpen,
    onOpen: navOnOpen,
    onClose: navOnClose,
  } = useDisclosure()

  return (
    <>
      <VStack
        bg="white"
        maxH={'100%'}
        minW={{ base: '30px', md: '44px' }}
        pos={'relative'}
        alignItems={'flex-end'}
        ml={5}
      >
        <Flex
          height={'100%'}
          overflow={'auto'}
          flexDir={'column'}
          mt={'16px'}
          w={'100%'}
          gap={4}
          {...props}
        >
          <IconButton
            variant="outline"
            aria-label="Open Navbar"
            icon={<GiHamburgerMenu size={'12px'} />}
            onClick={navOnOpen}
            minW={'auto'}
            w={{ base: '30px', md: '44px' }}
            h={{ base: '30px', md: '44px' }}
          />
          {additionalNav}
        </Flex>
      </VStack>
      {/* NAVBAR */}
      <Drawer
        isOpen={navIsOpen}
        placement="right"
        onClose={navOnClose}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton rounded={'0'} textColor={'black'} />
          <DrawerBody>
            <Header isDrawer />
            <AuctionStaticBanner />
            {/* <AuctionBanner displayMintNow /> */}
          </DrawerBody>

          <DrawerFooter as={'div'}>
            <Footer isDrawer />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
