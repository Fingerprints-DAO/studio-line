import { ERC20ABI } from '@dapp/contracts'
import { getContractAddressesForChainOrThrow } from './addresses'

export const getContractsDataForChainOrThrow = async (chainId: number) => {
  const addresses = await getContractAddressesForChainOrThrow(chainId)
  return {
    ERC20: {
      abi: ERC20ABI,
      address: addresses.ERC20Mock,
    },
  }
}
