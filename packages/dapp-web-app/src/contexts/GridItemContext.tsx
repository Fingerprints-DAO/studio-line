import React, { createContext, useState, useContext } from 'react'

// Tipo para o estado dos itens
type GridItemState = {
  [key: string]: boolean
}

// Criando o contexto com um estado vazio e uma função dummy para atualizá-lo
const GridItemContext = createContext<{
  gridItemsState: GridItemState
  soldItems: GridItemState
  toggleGridItem: (index: string) => void
}>({
  gridItemsState: {},
  soldItems: {},
  toggleGridItem: () => {},
})

export const useGridItemContext = () => useContext(GridItemContext)

export const GridItemProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})
  const [soldItems] = useState<GridItemState>({
    '0-0': true,
    '3-4': true,
    '20-5': true,
    '10-20': true,
  })

  const toggleGridItem = (index: string) => {
    setGridItemsState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <GridItemContext.Provider
      value={{ gridItemsState, toggleGridItem, soldItems }}
    >
      {children}
    </GridItemContext.Provider>
  )
}
