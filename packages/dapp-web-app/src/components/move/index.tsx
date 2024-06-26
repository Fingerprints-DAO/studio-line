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
import { TransactionProvider } from 'contexts/TransactionContext'

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
      <Layout
        sidebar={isRegularScreen ? <SidebarDetailed /> : null}
        sidebarProvider={TransactionProvider}
      >
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
          <DrawerContent pt={0}>
            <DrawerCloseButton rounded={'0'} textColor={'black'} />
            <DrawerBody>
              <TransactionProvider>
                <SidebarDetailed
                  handleFixMyToken={onFixMyTokenClick}
                  isDrawer
                />
              </TransactionProvider>
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
