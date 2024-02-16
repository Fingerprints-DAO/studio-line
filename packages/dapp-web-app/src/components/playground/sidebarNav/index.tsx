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
import { IoEyeOutline } from 'react-icons/io5'
import { GrPowerCycle } from 'react-icons/gr'
import { usePlaygroundContext } from 'contexts/PlaygroundContext'
import { SidebarDetailed } from '../sidebar/SidebarDetailed'

export function SidebarNav() {
  const { lastSelectedGridItem, resetGrid } = usePlaygroundContext()
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
        label={'Open Preview'}
        placement="auto"
        opacity={0.6}
      >
        <IconButton
          variant="outline"
          aria-label="Open preview"
          icon={<IoEyeOutline size={'12px'} />}
          onClick={sidebarOnOpen}
          minW={'auto'}
          w={{ base: '30px', md: '44px' }}
          h={{ base: '30px', md: '44px' }}
          isDisabled={!lastSelectedGridItem}
        />
      </Tooltip>
      <Tooltip
        hasArrow
        arrowSize={6}
        gutter={4}
        borderRadius={0}
        p={'6px'}
        bgColor={'rgba(45, 55, 72, 1)'}
        backdropFilter={'blur(4px)'}
        openDelay={300}
        label={'Reset playground'}
        placement="auto"
        opacity={0.6}
      >
        <IconButton
          variant="outline"
          aria-label="Reset playground"
          icon={<GrPowerCycle size={'12px'} />}
          onClick={resetGrid}
          minW={'auto'}
          w={{ base: '30px', md: '44px' }}
          h={{ base: '30px', md: '44px' }}
          isDisabled={!lastSelectedGridItem}
        />
      </Tooltip>
      <Drawer
        isOpen={sidebarIsOpen}
        placement="right"
        onClose={sidebarOnClose}
        size={'lg'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton rounded={'0'} textColor={'black'} />
          <DrawerBody>
            <SidebarDetailed isDrawer />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
