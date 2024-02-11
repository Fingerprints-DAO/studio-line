import { NextApiRequest, NextApiResponse } from 'next'
import { getBaseURL } from 'utils/getLink'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Location', getBaseURL() + '/mint')
  res.status(302).send('')
}
