import { getBaseURL } from 'utils/getLink'

export async function POST() {
  return new Response('', {
    status: 302,
    headers: { Location: getBaseURL() + '/about' },
  })
}
