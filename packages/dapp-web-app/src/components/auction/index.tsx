'use client'

import React from 'react'
import { TokensProvider } from 'contexts/TokensContext'
import { AuctionProvider } from 'contexts/AuctionContext'
import AuctionGrid from './grid/AuctionGrid'
import { SidebarDetailed } from './sidebar/SidebarDetailed'
import Layout from 'components/layout'
import { SidebarNav } from './sidebarNav'

export default function Auction() {
  return (
    <TokensProvider>
      <Layout
        sidebar={<SidebarDetailed />}
        sidebarIcons={<SidebarNav />}
        sidebarProvider={AuctionProvider}
      >
        <AuctionGrid />
      </Layout>
    </TokensProvider>
  )
}
