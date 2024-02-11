import { fetcher } from 'utils/fetcher'

export type GetDiscountResponse = {
  hasDiscount: boolean
  discountPercentage: number
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

    const responses = await Promise.all(discountApis)
    if (responses[0].hasDiscount || responses[1].hasDiscount) {
      hasDiscount = true
      discountPercentage = responses[0].hasDiscount ? 20 : 15
    }
  } catch (error) {
    console.error('Error checking discounts:', error)
    hasDiscount = false
  }

  return Response.json({
    hasDiscount,
    discountPercentage,
  })
}
