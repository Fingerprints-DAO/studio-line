import { NextResponse } from 'next/server'
import { getBaseURL } from 'utils/getLink'

export async function POST() {
  return new NextResponse('', {
    status: 302,
    headers: { Location: getBaseURL() + '/about' },
  })
}
