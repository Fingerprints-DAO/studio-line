import { NextResponse } from 'next/server'
import { fetcher } from 'utils/fetcher'

export type GetDiscountResponse = {
  hasDiscount: boolean
  discountPercentage: number
  merkleProof: string[]
}

export async function POST(req: Request) {
  const { address } = await req.json()
  let discountPercentage = 0
  let hasDiscount = false
  let merkleProof = []

  try {
    const response = await fetcher(
      `https://api.fingerprintsdao.xyz/api/line/discountList?address=${address}`,
    )
    if (response.hasDiscount) {
      hasDiscount = true
      discountPercentage = response.discountValue
      merkleProof = response.merkleProof
    }
  } catch (error) {
    console.error('Error checking discounts:', error)
    hasDiscount = false
  }

  return NextResponse.json({
    hasDiscount,
    discountPercentage,
    merkleProof,
  })
}
