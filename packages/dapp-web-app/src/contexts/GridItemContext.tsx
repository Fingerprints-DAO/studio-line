import React, { createContext, useState, useContext } from 'react'

// Tipo para o estado dos itens
type GridItemState = {
  [key: string]: boolean
}

// Criando o contexto com um estado vazio e uma função dummy para atualizá-lo
const GridItemContext = createContext<{
  gridItemsState: GridItemState
  toggleGridItem: (index: string) => void
}>({
  gridItemsState: {},
  toggleGridItem: () => {},
})

export const useGridItemContext = () => useContext(GridItemContext)

export const GridItemProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [gridItemsState, setGridItemsState] = useState<GridItemState>({})

  const toggleGridItem = (index: string) => {
    setGridItemsState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  return (
    <GridItemContext.Provider value={{ gridItemsState, toggleGridItem }}>
      {children}
    </GridItemContext.Provider>
  )
}
