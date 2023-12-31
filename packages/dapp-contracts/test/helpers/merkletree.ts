import { ethers, keccak256 } from 'ethers'
import { MerkleTree } from 'merkletreejs'

export function createMerkletree(whitelist: string[]) {
  let leaves = whitelist.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
  return merkleTree
}

export function getRootHash(merkleTree: MerkleTree) {
  const merkleRootHash = merkleTree.getHexRoot()
  return merkleRootHash
}

export function getProof(merkleTree: MerkleTree, userWalletAddress: string) {
  let proof = []
  let hashedAddress = keccak256(userWalletAddress)
  proof = merkleTree.getHexProof(hashedAddress)
  return proof
  // Return proof to web
}
