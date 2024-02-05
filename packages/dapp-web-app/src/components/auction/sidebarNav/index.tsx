'use client'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  IconButton,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { BsCart3 } from 'react-icons/bs'
import { SidebarDetailed } from '../sidebar/SidebarDetailed'
import { useTokensContext } from 'contexts/TokensContext'

export function SidebarNav() {
  const {
    isOpen: sidebarIsOpen,
    onOpen: sidebarOnOpen,
    onClose: sidebarOnClose,
  } = useDisclosure()

  return (
    <>
      <Tooltip
        hasArrow
        arrowSize={6}
        gutter={4}
        borderRadius={0}
        p={'6px'}
        bgColor={'rgba(45, 55, 72, 1)'}
        backdropFilter={'blur(4px)'}
        openDelay={300}
        label={'Auction details'}
        placement="auto"
        opacity={0.6}
      >
        <IconButton
          variant="outline"
          aria-label="Open mint details"
          icon={<BsCart3 />}
          onClick={sidebarOnOpen}
          w="44px"
          h="44px"
        />
      </Tooltip>
      <Drawer
        isOpen={sidebarIsOpen}
        placement="right"
        onClose={sidebarOnClose}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent pt={14}>
          <DrawerCloseButton rounded={'0'} textColor={'black'} />
          <DrawerBody>
            <SidebarDetailed isDrawer />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
