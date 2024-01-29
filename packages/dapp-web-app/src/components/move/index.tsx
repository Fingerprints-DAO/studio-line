'use client'

import React from 'react'
import { MoveProvider } from 'contexts/MoveContext'
import MoveGrid from './grid/MoveGrid'
import { SidebarDetailed } from './sidebar/SidebarDetailed'
import Layout from 'components/layout'

export default function Move() {
  return (
    <MoveProvider>
      <Layout sidebar={<SidebarDetailed />}>
        <MoveGrid />
      </Layout>
    </MoveProvider>
  )
}
