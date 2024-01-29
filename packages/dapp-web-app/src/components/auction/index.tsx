'use client'

import React from 'react'
import { AuctionProvider } from 'contexts/AuctionContext'
import AuctionGrid from './grid/AuctionGrid'
import { SidebarDetailed } from './sidebar/SidebarDetailed'
import Layout from 'components/layout'

export default function Auction() {
  return (
    <AuctionProvider>
      <Layout sidebar={<SidebarDetailed />}>
        <AuctionGrid />
      </Layout>
    </AuctionProvider>
  )
}
