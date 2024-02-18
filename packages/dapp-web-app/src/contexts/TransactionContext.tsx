import React, { createContext, useContext, useEffect, useState } from 'react'
import { TransactionError } from 'types/transaction'
import { Address, useWaitForTransaction } from 'wagmi'
import useMovePoint, { useMovePointReturnType } from 'hooks/useMovePoint'

export type TransactionContextType = {
  isLoading: boolean
  isWaitingApproval: boolean
  isSuccess: boolean
  hash?: Address
  error?: TransactionError
  move: useMovePointReturnType['getMoveFunction'] | (() => void)
  setNextPoint: typeof useState | (() => void)
  nextPoint: string | undefined
}
export const TransactionContext = createContext<TransactionContextType>({
  isLoading: false,
  isWaitingApproval: false,
  isSuccess: false,
  hash: undefined,
  error: undefined,
  move: () => {},
  setNextPoint: () => {},
  nextPoint: undefined,
})

export const useTransactionContext = () => useContext(TransactionContext)

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [nextPoint, setNextPoint] = useState()
  const { getMoveFunction, getCurrentMoveToCall } = useMovePoint()
  const moveTx = useWaitForTransaction({
    hash: getCurrentMoveToCall().data?.hash,
    enabled: getCurrentMoveToCall().data?.hash !== undefined,
  })

  useEffect(() => {
    if (moveTx.isSuccess) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
      }, 10_000)
    }
    if (moveTx.isError) {
      setIsSuccess(false)
    }
  }, [moveTx.isError, moveTx.isSuccess])

  return (
    <TransactionContext.Provider
      value={{
        isLoading: moveTx.isLoading || getCurrentMoveToCall().isLoading,
        isSuccess,
        isWaitingApproval: getCurrentMoveToCall().isLoading,
        hash: getCurrentMoveToCall().data?.hash,
        error: (getCurrentMoveToCall().error as TransactionError) || undefined,
        move: getMoveFunction as useMovePointReturnType['getMoveFunction'],
        setNextPoint: setNextPoint as typeof useState,
        nextPoint,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
