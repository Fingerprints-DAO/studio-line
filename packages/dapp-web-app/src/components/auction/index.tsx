'use client'

import React from 'react'
import { TokensProvider } from 'contexts/TokensContext'
import { AuctionProvider } from 'contexts/AuctionContext'
import AuctionGrid from './grid/AuctionGrid'
import { SidebarDetailed } from './sidebar/SidebarDetailed'
import Layout from 'components/layout'

export default function Auction() {
  return (
    <TokensProvider>
      <Layout
        sidebar={
          <AuctionProvider>
            <SidebarDetailed />
          </AuctionProvider>
        }
      >
        <AuctionGrid />
      </Layout>
    </TokensProvider>
  )
}
