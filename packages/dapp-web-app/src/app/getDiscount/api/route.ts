import { NextResponse } from 'next/server'
import { fetcher } from 'utils/fetcher'

export type GetDiscountResponse = {
  hasDiscount: boolean
  discountPercentage: number
}
enum DISCOUNTS {
  HOLDER_LIST = 25,
  FP_LIST = 15,
}

export async function POST(req: Request) {
  const { address } = await req.json()
  let discountPercentage = 0
  let hasDiscount = false

  try {
    const discountApis = [
      fetcher(
        `http://api.fingerprintsdao.xyz/api/line/discountList?address=${address}`,
      ),
      fetcher(
        `http://api.fingerprintsdao.xyz/api/line/discountList2?address=${address}`,
      ),
    ]
    console.log('fetching', address)
    console.log(
      'fetching',
      `http://api.fingerprintsdao.xyz/api/line/discountList?address=${address}`,
    )
    console.log(
      'fetching',
      `http://api.fingerprintsdao.xyz/api/line/discountList2?address=${address}`,
    )

    const responses = await Promise.all(discountApis)
    console.log(responses[0], responses[1])
    if (responses[0].hasDiscount || responses[1].hasDiscount) {
      hasDiscount = true
      discountPercentage = responses[0].hasDiscount
        ? DISCOUNTS.HOLDER_LIST
        : DISCOUNTS.FP_LIST
    }
  } catch (error) {
    console.error('Error checking discounts:', error)
    hasDiscount = false
  }

  return NextResponse.json({
    hasDiscount,
    discountPercentage,
  })
}
