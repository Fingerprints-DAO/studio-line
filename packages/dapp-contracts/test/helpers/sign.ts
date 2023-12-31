import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { network } from 'hardhat'
// import { BigNumber } from 'ethers'

const Bid = [
  {
    name: 'account',
    type: 'address',
  },
  {
    name: 'qty',
    type: 'uint32',
  },
  {
    name: 'nonce',
    type: 'uint256',
  },
  {
    name: 'deadline',
    type: 'uint256',
  },
]

export const signBid = async (
  signer: SignerWithAddress,
  verifier: string,
  bid: any,
) => {
  const types = {
    Bid,
  }
  return await sign(signer, verifier, types, bid)
}

const sign = async (
  signer: SignerWithAddress,
  verifier: string,
  types: any,
  obj: any,
) => {
  const chainId = BigInt(network.config.chainId ?? 31337)
  const domain = {
    name: 'Fingerprints DAO Dutch Auction',
    version: '1',
    chainId,
    verifyingContract: verifier,
  }
  const signature = await signer.signTypedData(domain, types, obj)
  return signature
}

export default signBid
