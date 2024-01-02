import { ERC20Factory } from '@dapp/contracts'

export interface ContractAddress {
  ERC20Mock: string
  chainId: number
}

export interface Contracts {
  ERC20Factory: ReturnType<typeof ERC20Factory.connect>
}

export enum ChainId {
  Mainnet = 1,
  Goerli = 5,
  BaseGoerli = 84531,
  Hardhat = 31337,
}
