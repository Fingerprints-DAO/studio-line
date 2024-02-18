'use client'

import React from 'react'
import PlaygroundGrid from 'components/playground/grid/PlaygroundGrid'
import { PlaygroundProvider } from 'contexts/PlaygroundContext'
import { SidebarDetailed } from 'components/playground/sidebar/SidebarDetailed'
import Layout from 'components/layout'
import { AuctionProvider } from 'contexts/AuctionContext'
import { SidebarNav } from './sidebarNav'

export default function Playground() {
  return (
    <PlaygroundProvider>
      <Layout
        sidebar={<SidebarDetailed />}
        sidebarIcons={<SidebarNav />}
        // sidebarProvider={AuctionProvider}
      >
        <PlaygroundGrid />
      </Layout>
    </PlaygroundProvider>
  )
}
