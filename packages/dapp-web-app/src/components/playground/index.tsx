'use client'

import React from 'react'
import { Container, Flex, VStack } from '@chakra-ui/react'
import PlaygroundGrid from 'components/playground/grid/PlaygroundGrid'
import { PlaygroundProvider } from 'contexts/PlaygroundContext'
import { SidebarDetailed } from 'components/playground/sidebar/SidebarDetailed'
import Layout from 'components/layout'
import { AuctionProvider } from 'contexts/AuctionContext'

export default function Playground() {
  return (
    <PlaygroundProvider>
      <Layout
        sidebar={
          <AuctionProvider>
            <SidebarDetailed />
          </AuctionProvider>
        }
      >
        <PlaygroundGrid />
      </Layout>
    </PlaygroundProvider>
  )
}
