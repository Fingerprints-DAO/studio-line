'use client'

import React, { useEffect } from 'react'
import { MoveProvider, useMoveContext } from 'contexts/MoveContext'
import MoveGrid from './grid/MoveGrid'
import { SidebarDetailed } from './sidebar/SidebarDetailed'
import Layout from 'components/layout'
import { useDisplayConfig } from 'hooks/useDisplayConfig'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'

function MoveGridWithDrawer() {
  const { isRegularScreen, isMediumScreen } = useDisplayConfig()
  const {
    isOpen: sidebarIsOpen,
    onOpen: sidebarOnOpen,
    onClose: sidebarOnClose,
  } = useDisclosure()
  const { selectedGridItem, resetSelection } = useMoveContext()

  const onClose = () => {
    resetSelection()
    sidebarOnClose()
  }

  const onFixMyTokenClick = () => {}

  useEffect(() => {
    if (selectedGridItem) {
      sidebarOnOpen()
    }
  }, [selectedGridItem, sidebarOnOpen])

  return (
    <>
      <Layout sidebar={isRegularScreen ? <SidebarDetailed /> : null}>
        <MoveGrid />
      </Layout>
      {isMediumScreen && (
        <Drawer
          isOpen={sidebarIsOpen}
          placement="right"
          onClose={onClose}
          size={'lg'}
        >
          <DrawerOverlay />
          <DrawerContent pt={14}>
            <DrawerCloseButton rounded={'0'} textColor={'black'} />
            <DrawerBody>
              <SidebarDetailed handleFixMyToken={onFixMyTokenClick} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

export default function Move() {
  return (
    <MoveProvider>
      <MoveGridWithDrawer />
    </MoveProvider>
  )
}
