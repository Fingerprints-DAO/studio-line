'use client'

import { GetDiscountResponse } from 'app/getDiscount/api/route'
import { useState, useEffect } from 'react'
import { fetcher } from 'utils/fetcher'
import { Address, useAccount } from 'wagmi'

export function useDiscount() {
  const [discountValue, setDiscountValue] = useState<number | null>(null)
  const [merkleProof, setMerkleProof] = useState<Address[]>([])
  const { address } = useAccount()

  useEffect(() => {
    const checkDiscount = async (address: string) => {
      try {
        const response = await fetcher<GetDiscountResponse>(
          '/getDiscount/api',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
          },
        )
        setDiscountValue(response.discountPercentage)
        setMerkleProof(response.merkleProof as Address[])
      } catch (error) {
        console.error('Error checking discounts:', error)
        setDiscountValue(null)
      }
    }

    if (address) checkDiscount(address)
  }, [address])

  return {
    value: discountValue,
    hasDiscount: discountValue !== null && discountValue > 0,
    isLoading: !discountValue,
    merkleProof,
  }
}
