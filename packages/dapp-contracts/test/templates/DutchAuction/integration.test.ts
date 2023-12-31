import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

import { DutchAuction } from '../../../typechain-types'
import { parseEther } from 'ethers'

const startAuction = async (auction: DutchAuction) => {
  const [deployer] = await ethers.getSigners()
  const startAmount = parseEther('2')
  const endAmount = parseEther('0.2')
  const limit = parseEther('10')
  const refundDelayTime = 30 * 60
  const startTime = Math.floor(Date.now() / 1000) - 100
  const endTime = startTime + 3 * 3600

  await auction
    .connect(deployer)
    .setConfig(startAmount, endAmount, refundDelayTime, startTime, endTime)

  return {
    startAmount,
    endAmount,
    limit,
    refundDelayTime,
    startTime,
    endTime,
  }
}

describe('Dutch auction integration tests', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  function callFixture(supply = 20) {
    return async function deployFixture() {
      // Contracts are deployed using the first signer/account by default
      const [deployer, alice, bob, signer, treasury, marcia] =
        await ethers.getSigners()

      const Panopticon = await ethers.getContractFactory('Mock721')
      const nft = await Panopticon.deploy(
        treasury.address,
        deployer.address,
        supply,
        'https://arod.studio/',
      )

      const Auction = await ethers.getContractFactory('DutchAuction')
      const auction = await Auction.deploy(
        await nft.getAddress(),
        treasury.address,
      )

      await nft.setMinterAddress(await auction.getAddress())

      return { nft, deployer, alice, bob, auction, marcia }
    }
  }

  describe('Integration', function () {
    it('fails when bid after max supply reached out', async function () {
      const { alice, bob, marcia, auction } = await loadFixture(callFixture(3))

      const { startAmount } = await startAuction(auction)
      const aliceQty = 1n
      const bobQty = 2n
      const marciaQty = 1n
      await Promise.all([
        auction.connect(alice).bid(aliceQty, [], {
          value: startAmount * aliceQty,
        }),
        auction.connect(bob).bid(bobQty, [], { value: startAmount * bobQty }),
      ])

      await expect(
        auction.connect(marcia).bid(marciaQty, [], {
          value: startAmount * marciaQty,
        }),
      ).to.reverted
    })
    it('fails when sold out and try to get rebate', async function () {
      const { alice, marcia, auction } = await loadFixture(callFixture(3))

      const { startAmount } = await startAuction(auction)
      const aliceQty = 3n

      await auction.connect(alice).bid(aliceQty, [], {
        value: startAmount * (aliceQty + 2n),
      })

      await expect(auction.connect(marcia).claimRefund()).to.reverted
    })
    it('fails when sold out and try to withdraw funds', async function () {
      const { deployer, alice, auction } = await loadFixture(callFixture(3))

      const { startAmount } = await startAuction(auction)
      const aliceQty = 3n
      await auction.connect(alice).bid(aliceQty, [], {
        value: startAmount * (aliceQty + 2n),
      })

      await expect(auction.connect(deployer).withdrawFunds()).to.reverted
    })
  })
})
