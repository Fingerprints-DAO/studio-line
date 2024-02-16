import { Address } from 'viem'
import { getChain } from './chain'

export const getBaseURL = () => {
  const base = process.env.NEXT_PUBLIC_VERCEL_URL
  let protocol = 'https://'
  if (process.env.NODE_ENV === 'development') protocol = 'http://'
  return `${protocol}${base}`
}

export const getExternalOpenseaUrl = (address: string, id?: string) => {
  const base = process.env.NEXT_PUBLIC_OPENSEA_URL
  return `${base}assets/${getChain().name.toLowerCase()}/${address}${
    id ? `/${id}` : ''
  }`
}
export const getExternalEtherscanUrl = (address?: Address) => {
  const base = process.env.NEXT_PUBLIC_ETHERSCAN_URL
  return `${base}address/${address ?? ''}`
}
export const getExternalTxUrl = (address?: Address) => {
  const base = process.env.NEXT_PUBLIC_ETHERSCAN_URL
  return `${base}tx/${address ?? ''}`
}

export const handleArweaveUrl = (url?: string) => {
  // ar://Y-05cY1jiKkVn9aCL3Di3sOWfCUZRPLaoASs0LYJOsU/446.jpg
  // https://arweave.net/Y-05cY1jiKkVn9aCL3Di3sOWfCUZRPLaoASs0LYJOsU/1.jpg
  if (!url) return ''
  const olPrefix = 'ar://'
  const newPrefix = 'https://arweave.net/'

  return url.startsWith(olPrefix) ? url.replace(olPrefix, newPrefix) : url
}

export const getArweaveImageURL = (id: string | number) => {
  return `https://arweave.net/Y-05cY1jiKkVn9aCL3Di3sOWfCUZRPLaoASs0LYJOsU/${id}.jpg`
}
