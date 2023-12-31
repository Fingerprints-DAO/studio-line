import { expect } from 'chai'
import { ethers } from 'hardhat'
import { takeSnapshot, revertToSnapshot } from './../../helpers/snapshot'
import { increaseTime } from './../../helpers/time'
import { ZeroAddress, parseEther } from 'ethers'

import {
  createMerkletree,
  getProof,
  getRootHash,
} from './../../helpers/merkletree'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { Mock721, DutchAuction } from '../../../typechain-types'

describe('DutchAuction', function () {
  let nft: Mock721
  let auction: DutchAuction
  let admin: HardhatEthersSigner
  let alice: HardhatEthersSigner
  let bob: HardhatEthersSigner
  let signer: HardhatEthersSigner
  let treasury: HardhatEthersSigner
  let defaultAdminRole: string
  let startAmount: bigint
  let endAmount: bigint
  let refundDelayTime: number
  let startTime: number
  let endTime: number
  let snapshotId: number
  const anHour = 3600 // s to hour
  const twoHoursAndHalf = anHour * 2.5

  const makeBid = async (
    user: HardhatEthersSigner,
    qty: number,
    value: bigint,
    returnPrice = false,
    proof: string[] = [],
  ) => {
    const tx = await auction.connect(user).bid(qty, proof, { value })

    if (returnPrice) {
      const receipt = await tx.wait()
      const event = receipt?.logs.find((event) => event.data === 'Bid')
      // @ts-ignore
      const finalPrice = event?.args?.price
      return finalPrice
    }
  }

  before('Deploy', async () => {
    ;[admin, alice, bob, signer, treasury] = await ethers.getSigners()

    const Mock721 = await ethers.getContractFactory('Mock721')
    nft = await Mock721.deploy(
      treasury.address,
      admin.address,
      20,
      'https://arod.studio/',
    )

    const Auction = await ethers.getContractFactory('DutchAuction')
    auction = await Auction.deploy(await nft.getAddress(), treasury.address)

    await nft.connect(admin).setMinterAddress(await auction.getAddress())

    defaultAdminRole = await auction.DEFAULT_ADMIN_ROLE()

    startAmount = parseEther('2')
    endAmount = parseEther('0.2')
    refundDelayTime = 30 * 60
    startTime = Math.floor(Date.now() / 1000) - 100 // 2 minutes ago
    endTime = startTime + 3 * 3600 // 58 minutes from now
  })

  beforeEach(async () => {
    snapshotId = await takeSnapshot()
  })

  afterEach(async function () {
    await revertToSnapshot(snapshotId)
  })

  describe('Set Config', () => {
    it('should fail to set config as non-admin', async () => {
      await expect(
        auction
          .connect(alice)
          .setConfig(
            startAmount,
            endAmount,
            refundDelayTime,
            startTime,
            endTime,
          ),
      ).to.be.revertedWith(
        `AccessControl: account ${alice.address.toLowerCase()} is missing role ${defaultAdminRole}`,
      )
    })

    it('should fail to set config when startTime is 0', async () => {
      await expect(
        auction
          .connect(admin)
          .setConfig(startAmount, endAmount, refundDelayTime, 0, endTime),
      )
        .to.be.revertedWithCustomError(auction, 'InvalidStartEndTime')
        .withArgs(0, endTime)
    })

    it('should fail to set config when startTime >= endTime', async () => {
      await expect(
        auction
          .connect(admin)
          .setConfig(startAmount, endAmount, refundDelayTime, endTime, endTime),
      )
        .to.be.revertedWithCustomError(auction, 'InvalidStartEndTime')
        .withArgs(endTime, endTime)
    })

    it('should fail to set config when startAmount is 0', async () => {
      await expect(
        auction
          .connect(admin)
          .setConfig(0, endAmount, refundDelayTime, startTime, endTime),
      ).to.be.revertedWithCustomError(auction, 'InvalidAmountInWei')
    })

    it('should fail to set config when startAmount <= endAmount', async () => {
      await expect(
        auction
          .connect(admin)
          .setConfig(
            startAmount,
            startAmount,
            refundDelayTime,
            startTime,
            endTime,
          ),
      ).to.be.revertedWithCustomError(auction, 'InvalidAmountInWei')
    })

    it('should set config', async () => {
      await auction
        .connect(admin)
        .setConfig(startAmount, endAmount, refundDelayTime, startTime, endTime)
      const config = await auction.getConfig()
      expect(config.startAmountInWei).to.be.eq(startAmount)
      expect(config.endAmountInWei).to.be.eq(endAmount)
      expect(config.refundDelayTime).to.be.eq(refundDelayTime)
      expect(config.startTime).to.be.eq(startTime)
      expect(config.endTime).to.be.eq(endTime)
    })

    it('should fail to set config when auction is started', async () => {
      await auction
        .connect(admin)
        .setConfig(startAmount, endAmount, refundDelayTime, startTime, endTime)
      await expect(
        auction.connect(admin).setConfig(
          startAmount,
          endAmount,

          refundDelayTime,
          startTime,
          endTime,
        ),
      ).to.be.revertedWithCustomError(auction, 'ConfigAlreadySet')
    })
  })

  describe('setNftContractAddress', function () {
    it('should set the NFT contract address', async function () {
      const newAddress = '0x1234567890123456789012345678901234567890'
      await expect(auction.connect(admin).setNftContractAddress(newAddress)).to
        .not.be.reverted
      expect(await auction.nftContractAddress()).to.equal(newAddress)
    })

    it('should revert if called by non-admin', async function () {
      const newAddress = '0x1234567890123456789012345678901234567890'
      await expect(
        auction.connect(alice).setNftContractAddress(newAddress),
      ).to.be.revertedWith(/AccessControl/)
    })

    it('should revert if new address is zero', async function () {
      await expect(
        auction.connect(admin).setNftContractAddress(ZeroAddress),
      ).to.be.revertedWith(/zero address not allowed/)
    })
  })

  describe('Set Treasury', () => {
    it('should fail to set treasury as non-admin', async () => {
      await expect(
        auction.connect(alice).setTreasuryAddress(bob.address),
      ).to.be.revertedWith(
        `AccessControl: account ${alice.address.toLowerCase()} is missing role ${defaultAdminRole}`,
      )
    })

    it('should revert if new address is zero', async function () {
      await expect(
        auction.connect(admin).setTreasuryAddress(ZeroAddress),
      ).to.be.revertedWith(/zero address not allowed/)
    })

    it('should set treasury', async () => {
      await auction.connect(admin).setTreasuryAddress(bob.address)
      expect(await auction.treasuryAddress()).to.be.eq(bob.address)
    })
  })

  describe('Pause/Unpause', () => {
    it('should fail pause the contract as non-admin', async () => {
      await expect(auction.connect(alice).pause()).to.be.revertedWith(
        `AccessControl: account ${alice.address.toLowerCase()} is missing role ${defaultAdminRole}`,
      )
    })

    it('should pause the contract', async () => {
      await auction.connect(admin).pause()
      expect(await auction.paused()).to.be.eq(true)
    })

    it('should fail unpause the contract as non-admin', async () => {
      await expect(auction.connect(alice).unpause()).to.be.revertedWith(
        `AccessControl: account ${alice.address.toLowerCase()} is missing role ${defaultAdminRole}`,
      )
    })

    it('should pause the contract', async () => {
      await auction.connect(admin).pause()
      await auction.connect(admin).unpause()
      expect(await auction.paused()).to.be.eq(false)
    })
  })

  describe('Get current price', () => {
    it('should return start amount before auction starts', async () => {
      const newStartTime = Math.floor(Date.now() / 1000) + 1000
      await auction
        .connect(admin)
        .setConfig(
          startAmount,
          endAmount,
          refundDelayTime,
          newStartTime,
          endTime,
        )

      expect(await auction.getCurrentPriceInWei()).to.be.eq(startAmount)
    })

    it('should return end amount after auction ends', async () => {
      await auction
        .connect(admin)
        .setConfig(startAmount, endAmount, refundDelayTime, startTime, endTime)
      await increaseTime(3 * 3600)

      expect(await auction.getCurrentPriceInWei()).to.be.eq(endAmount)
    })
  })

  describe('Bid', () => {
    it('should fail to bid when config is not set', async () => {
      const qty = 5n
      await expect(
        auction.connect(alice).bid(qty, [], { value: startAmount * qty }),
      ).to.be.revertedWithCustomError(auction, 'ConfigNotSet')
    })

    it('should fail to bid before auction starts', async () => {
      const newStartTime = Math.floor(Date.now() / 1000) + 1000
      await auction
        .connect(admin)
        .setConfig(
          startAmount,
          endAmount,
          refundDelayTime,
          newStartTime,
          endTime,
        )

      const qty = 5n
      await expect(auction.connect(alice).bid(qty, [], { value: 0 }))
        .to.be.revertedWithCustomError(auction, 'InvalidStartEndTime')
        .withArgs(newStartTime, endTime)
    })

    describe('When config is set', () => {
      beforeEach(async () => {
        await auction
          .connect(admin)
          .setConfig(
            startAmount,
            endAmount,
            refundDelayTime,
            startTime,
            endTime,
          )
      })

      it('should fail to bid when nft contract paused', async () => {
        await nft.connect(admin).pause()

        const qty = 5n

        await expect(
          auction.connect(alice).bid(qty, [], { value: startAmount * qty }),
        ).to.be.revertedWith('Pausable: paused')
      })

      it('should fail to bid when paused', async () => {
        await auction.connect(admin).pause()

        const qty = 5n

        await expect(
          auction.connect(alice).bid(qty, [], { value: startAmount * qty }),
        ).to.be.revertedWith('Pausable: paused')
      })

      it('should fail to bid when insufficient eth is sent', async () => {
        const qty = 5n

        await expect(
          auction.connect(alice).bid(qty, [], { value: 0 }),
        ).to.be.revertedWithCustomError(auction, 'NotEnoughValue')
      })

      it('should fail to bid 0 quantity', async () => {
        const qty = 0n

        await expect(
          auction.connect(alice).bid(qty, [], { value: startAmount * qty }),
        ).to.be.revertedWithCustomError(auction, 'InvalidQuantity')
      })

      it('should bid', async () => {
        const qty = 5n

        const tx = await auction
          .connect(alice)
          .bid(qty, [], { value: startAmount * qty })

        await expect(tx).to.emit(auction, 'Bid')
        expect(await nft.balanceOf(alice.address)).to.be.eq(qty)
      })

      it('should bid more than twice before limit reached', async () => {
        const value = startAmount * 5n
        await increaseTime(anHour)
        await makeBid(alice, 5, value) // 1.4 x 5 = 7
        await increaseTime(30 * 60)
        await makeBid(alice, 2, value) // 1.1 x 2 = 2.2
        await increaseTime(30 * 60)
        await makeBid(alice, 1, value) // 0.8 x 1 = 0.8
      })

      it('should fail to bid when nft total supply reached', async () => {
        const value = startAmount * 5n
        await increaseTime(3600 * 2)
        await makeBid(alice, 10, value) // 0.8 x 10 = 8
        await makeBid(bob, 10, value) // 0.8 x 10 = 8

        await expect(
          auction.connect(alice).bid(1, [], { value }),
        ).to.be.revertedWithCustomError(auction, 'MaxSupplyReached')
      })

      it('should fail to bid when auction is ended', async () => {
        const qty = 5n

        await increaseTime(3 * 3600)
        await expect(auction.connect(alice).bid(qty, [], { value: 0 }))
          .to.be.revertedWithCustomError(auction, 'InvalidStartEndTime')
          .withArgs(startTime, endTime)
      })

      it('should bid and getUserData returns properly', async () => {
        const qty = 5n

        const tx = await auction
          .connect(alice)
          .bid(qty, [], { value: startAmount * qty })

        await expect(tx).to.emit(auction, 'Bid')
        const receipt = await tx.wait()
        // @ts-ignore
        const event = receipt?.events?.find(
          (event: { event: string }) => event.event === 'Bid',
        )
        // const finalPrice = event?.args?.price;
        const userData = await auction.getUserData(alice.address)

        // expect(userData.contribution).to.eq(finalPrice.mul(qty));
        expect(userData.contribution).to.eq(startAmount * qty)
        expect(userData.tokensBidded).to.eq(qty)
        expect(userData.tokensBiddedWithDiscount).to.eq(0)
        expect(userData.refundClaimed).to.be.false
      })

      it('should bid twice and getUserData returns properly', async () => {
        const value = startAmount * 5n
        const qty1 = 5
        const qty2 = 2
        await increaseTime(anHour)
        const finalPrice1 = await makeBid(alice, qty1, value, true) // 1.4 x 5 = 7
        await increaseTime(30 * 60)
        const finalPrice2 = await makeBid(alice, qty2, value, true) // 1.1 x 2 = 2.2
        const userData = await auction.getUserData(alice.address)

        expect(userData.contribution).to.eq(value * 2n)
        expect(userData.tokensBidded).to.eq(qty1 + qty2)
        expect(userData.refundClaimed).to.be.false
      })
    })
  })

  describe('Claim More NFTs', () => {
    it('should fail to claim nfts when config is not set', async () => {
      await expect(
        auction.connect(alice).claimTokens(2, []),
      ).to.be.revertedWithCustomError(auction, 'ConfigNotSet')
    })

    describe('When config is set', () => {
      beforeEach(async () => {
        await auction
          .connect(admin)
          .setConfig(
            startAmount,
            endAmount,
            refundDelayTime,
            startTime,
            endTime,
          )

        const qty = 3n
        await makeBid(alice, Number(qty), startAmount * qty)
      })

      it('should fail to claim nfts when paused', async () => {
        await auction.connect(admin).pause()
        await expect(
          auction.connect(alice).claimTokens(2, []),
        ).to.be.revertedWith('Pausable: paused')
      })

      it('should fail to claim nfts when there are nothing to claim', async () => {
        await expect(
          auction.connect(alice).claimTokens(2, []),
        ).to.be.revertedWithCustomError(auction, 'NothingToClaim')
      })

      it('should claim nfts - less than claimable', async () => {
        await increaseTime(2 * 3600)

        const tx = await auction.connect(alice).claimTokens(2, [])
        await expect(tx)
          .to.emit(auction, 'Claim')
          .withArgs(alice.address, 2, false)
      })

      it('should claim nfts - more than claimable', async () => {
        await increaseTime(anHour)

        const tx = await auction.connect(alice).claimTokens(5, [])
        await expect(tx)
          .to.emit(auction, 'Claim')
          .withArgs(alice.address, 1, false)
      })

      it('should claim nfts and claim again later', async () => {
        await increaseTime(anHour)
        await auction.connect(alice).claimTokens(5, [])
        await increaseTime(anHour)
        await auction.connect(alice).claimTokens(2, [])
      })

      it('should claim nfts and make a sold out with the right price', async () => {
        await makeBid(bob, 10, startAmount * 20n)
        await increaseTime(anHour)
        await auction.connect(alice).claimTokens(5, [])
        await increaseTime(anHour)

        const remainingAmount =
          (await nft.tokenIdMax()) - (await nft.currentTokenId())
        const lastBuyPrice = await auction.getCurrentPriceInWei()
        await auction.connect(bob).claimTokens(remainingAmount, [])

        expect(
          (await nft.tokenIdMax()) - (await nft.currentTokenId()),
        ).to.be.eq(0) // check if there is no nfts available

        await increaseTime(anHour * 2) // end auction

        expect(await auction.getSettledPriceInWei()).to.be.closeTo(
          lastBuyPrice,
          parseEther('0.001'),
        )
      })
    })
  })

  describe('Refund and withdraw funds without selling out', () => {
    describe('Claim Refund', () => {
      it('should fail to claim refund when config is not set', async () => {
        await expect(
          auction.connect(alice).claimRefund(),
        ).to.be.revertedWithCustomError(auction, 'ConfigNotSet')
      })

      describe('When config is set', () => {
        let alicePaid = 0n
        let bobPaid = 0n
        beforeEach(async () => {
          await auction
            .connect(admin)
            .setConfig(
              startAmount,
              endAmount,
              refundDelayTime,
              startTime,
              endTime,
            )
          const qty1 = 5n
          await makeBid(alice, Number(qty1), startAmount * qty1)
          alicePaid = startAmount

          await increaseTime(anHour)

          const qty2 = 3n
          await makeBid(bob, Number(qty2), startAmount * qty2)
          bobPaid = startAmount
        })

        it('should fail to claim refund when paused', async () => {
          await auction.connect(admin).pause()
          await expect(auction.connect(alice).claimRefund()).to.be.revertedWith(
            'Pausable: paused',
          )
        })

        it('should fail to claim refund before the auction is ended', async () => {
          await expect(
            auction.connect(alice).claimRefund(),
          ).to.be.revertedWithCustomError(auction, 'ClaimRefundNotReady')
        })

        it('settled price should be equal resting/end price', async () => {
          await increaseTime(twoHoursAndHalf)

          const settledPrice = await auction.getSettledPriceInWei()
          expect(settledPrice).to.be.eql(endAmount)
        })

        it('should claim refund after the auction is ended and refundDelayTime passed', async () => {
          await increaseTime(twoHoursAndHalf)

          const settledPrice = await auction.getSettledPriceInWei()
          const beforeAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const beforeBobBalance = await ethers.provider.getBalance(bob.address)
          const tx1 = await auction.connect(alice).claimRefund()
          await auction.connect(bob).claimRefund()
          await expect(tx1).to.emit(auction, 'ClaimRefund')
          const afterAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const afterBobBalance = await ethers.provider.getBalance(bob.address)

          expect(afterAliceBalance).to.be.closeTo(
            beforeAliceBalance + (alicePaid - endAmount) * 5n,
            parseEther('0.0001'),
          )
          expect(afterBobBalance).to.be.closeTo(
            beforeBobBalance + (bobPaid - endAmount) * 3n,
            parseEther('0.0001'),
          )
          expect(afterAliceBalance).to.be.closeTo(
            beforeAliceBalance + (alicePaid - settledPrice) * 5n,
            parseEther('0.0001'),
          )
          expect(afterBobBalance).to.be.closeTo(
            beforeBobBalance + (bobPaid - settledPrice) * 3n,
            parseEther('0.0001'),
          )
        })

        it('should claim refund after cropped mint supply', async () => {
          await increaseTime(twoHoursAndHalf)

          const settledPrice = await auction.getSettledPriceInWei()
          const beforeAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const beforeBobBalance = await ethers.provider.getBalance(bob.address)

          await nft.endMint()

          const tx1 = await auction.connect(alice).claimRefund()
          await auction.connect(bob).claimRefund()
          await expect(tx1).to.emit(auction, 'ClaimRefund')
          const afterAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const afterBobBalance = await ethers.provider.getBalance(bob.address)

          expect(afterAliceBalance).to.be.closeTo(
            beforeAliceBalance + (alicePaid - settledPrice) * 5n,
            parseEther('0.001'),
          )
          expect(afterBobBalance).to.be.closeTo(
            beforeBobBalance + (bobPaid - settledPrice) * 3n,
            parseEther('0.001'),
          )
        })

        it('should fail to claim refund twice', async () => {
          await increaseTime(twoHoursAndHalf)

          await auction.connect(alice).claimRefund()
          await auction.connect(bob).claimRefund()

          await expect(
            auction.connect(alice).claimRefund(),
          ).to.be.revertedWithCustomError(auction, 'UserAlreadyClaimed')
          await expect(
            auction.connect(bob).claimRefund(),
          ).to.be.revertedWithCustomError(auction, 'UserAlreadyClaimed')
        })
      })
    })

    describe('Admin Refund Users', () => {
      it('should fail to claim refund when config is not set', async () => {
        await expect(
          auction.connect(admin).refundUsers([alice.address, bob.address]),
        ).to.be.revertedWithCustomError(auction, 'ConfigNotSet')
      })

      describe('When config is set', () => {
        let alicePaid = 0n
        let bobPaid = 0n
        beforeEach(async () => {
          await auction
            .connect(admin)
            .setConfig(
              startAmount,
              endAmount,
              refundDelayTime,
              startTime,
              endTime,
            )
          const qty1 = 5n
          await makeBid(alice, Number(qty1), startAmount * qty1)
          alicePaid = startAmount

          await increaseTime(anHour)

          const qty2 = 3n
          await makeBid(bob, Number(qty2), startAmount * qty2)
          bobPaid = startAmount
        })

        it('should fail to refund users as non-admin', async () => {
          await expect(
            auction.connect(alice).refundUsers([bob.address]),
          ).to.be.revertedWith(
            `AccessControl: account ${alice.address.toLowerCase()} is missing role ${defaultAdminRole}`,
          )
        })

        it('should fail to refund users when paused', async () => {
          await auction.connect(admin).pause()
          await expect(
            auction.connect(admin).refundUsers([alice.address, bob.address]),
          ).to.be.revertedWith('Pausable: paused')
        })

        it('should fail to refund users before the auction is ended', async () => {
          await expect(
            auction.connect(admin).refundUsers([alice.address, bob.address]),
          ).to.be.revertedWithCustomError(auction, 'ClaimRefundNotReady')
        })

        it('should refund users after the auction is ended and refundDelayTime passed', async () => {
          await increaseTime(twoHoursAndHalf)
          const settledPrice = await auction.getSettledPriceInWei()

          const beforeAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const beforeBobBalance = await ethers.provider.getBalance(bob.address)
          const tx = await auction
            .connect(admin)
            .refundUsers([alice.address, bob.address])
          await expect(tx).to.emit(auction, 'ClaimRefund')
          const afterAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const afterBobBalance = await ethers.provider.getBalance(bob.address)
          expect(afterAliceBalance).to.be.closeTo(
            beforeAliceBalance + (alicePaid - settledPrice) * 5n,
            parseEther('0.001'),
          )
          expect(afterBobBalance).to.be.closeTo(
            beforeBobBalance + (bobPaid - endAmount) * 3n,
            parseEther('0.001'),
          )
        })

        it('should fail to refund users twice', async () => {
          await increaseTime(twoHoursAndHalf)

          await auction.connect(admin).refundUsers([alice.address, bob.address])

          await expect(
            auction.connect(admin).refundUsers([alice.address, bob.address]),
          ).to.be.revertedWithCustomError(auction, 'UserAlreadyClaimed')
        })
      })
    })

    describe('Withdraw Funds', () => {
      let contractBalanceBefore = 0n
      beforeEach(async () => {
        contractBalanceBefore = await ethers.provider.getBalance(
          auction.getAddress(),
        )
        await auction
          .connect(admin)
          .setConfig(
            startAmount,
            endAmount,
            refundDelayTime,
            startTime,
            endTime,
          )
        const qty1 = 5n
        await makeBid(alice, Number(qty1), startAmount * qty1)
        await increaseTime(anHour)

        const qty2 = 3n
        await makeBid(bob, Number(qty2), startAmount * qty2)
      })

      it('should fail to withdraw funds when auction is not ended', async () => {
        await expect(
          auction.connect(admin).withdrawFunds(),
        ).to.be.revertedWithCustomError(auction, 'NotEnded')
      })

      it('should fail to withdraw funds as non-admin', async () => {
        await increaseTime(2 * 3600)
        await expect(auction.connect(alice).withdrawFunds()).to.be.revertedWith(
          `AccessControl: account ${alice.address.toLowerCase()} is missing role ${defaultAdminRole}`,
        )
      })

      it('should withdraw funds', async () => {
        await increaseTime(2 * 3600)
        const settledPrice = await auction.getSettledPriceInWei()
        const beforeBalance = await ethers.provider.getBalance(treasury.address)
        await auction.connect(admin).withdrawFunds()
        const afterBalance = await ethers.provider.getBalance(treasury.address)
        expect(afterBalance).to.be.closeTo(
          beforeBalance + settledPrice * 8n,
          parseEther('0.01'),
        )
      })

      it('should withdraw funds properly with sold out', async () => {
        const remainingAmount =
          (await nft.tokenIdMax()) - (await nft.currentTokenId())

        await makeBid(
          admin,
          Number(remainingAmount),
          startAmount * remainingAmount,
        )

        await increaseTime(2 * 3600)
        const settledPrice = await auction.getSettledPriceInWei()
        const beforeBalance = await ethers.provider.getBalance(treasury.address)
        await auction.connect(admin).withdrawFunds()
        const afterBalance = await ethers.provider.getBalance(treasury.address)
        expect(afterBalance).to.be.closeTo(
          beforeBalance + settledPrice * (8n + BigInt(remainingAmount)),
          parseEther('0.01'),
        )
      })

      it('should have 0 eth after withdraw funds and refund users', async () => {
        await increaseTime(twoHoursAndHalf)
        const tx = await auction
          .connect(admin)
          .refundUsers([alice.address, bob.address])
        await expect(tx).to.emit(auction, 'ClaimRefund')

        await auction.connect(admin).withdrawFunds()
        const afterBalance = await ethers.provider.getBalance(
          auction.getAddress(),
        )
        expect(afterBalance).to.be.eq(contractBalanceBefore)
      })

      it('should have 0 eth after withdraw funds and refund users after a sold out', async () => {
        const remainingAmount =
          (await nft.tokenIdMax()) - (await nft.currentTokenId())

        await makeBid(
          admin,
          Number(remainingAmount),
          startAmount * BigInt(remainingAmount),
        )

        await increaseTime(twoHoursAndHalf)
        const tx = await auction
          .connect(admin)
          .refundUsers([alice.address, bob.address, admin.address])
        await expect(tx).to.emit(auction, 'ClaimRefund')

        await auction.connect(admin).withdrawFunds()
        const afterBalance = await ethers.provider.getBalance(
          auction.getAddress(),
        )
        expect(afterBalance).to.be.eq(contractBalanceBefore)
      })

      it('should fail to withdraw funds twice', async () => {
        await increaseTime(2 * 3600)
        await auction.connect(admin).withdrawFunds()
        await expect(
          auction.connect(admin).withdrawFunds(),
        ).to.be.revertedWithCustomError(auction, 'AlreadyWithdrawn')
      })
    })
  })

  describe('Refund and withdraw funds when SELLING OUT', () => {
    describe('Claim Refund', () => {
      it('should fail to claim refund when config is not set', async () => {
        await expect(
          auction.connect(alice).claimRefund(),
        ).to.be.revertedWithCustomError(auction, 'ConfigNotSet')
      })

      describe('When config is set', () => {
        let alicePaid = 0n
        let bobPaid = 0n
        beforeEach(async () => {
          await auction
            .connect(admin)
            .setConfig(
              startAmount,
              endAmount,
              refundDelayTime,
              startTime,
              endTime,
            )
          const qty1 = 5n
          await makeBid(alice, Number(qty1), startAmount * qty1)
          alicePaid = startAmount

          await increaseTime(anHour)

          const qty2 = 3n

          const remainingAmount =
            (await nft.tokenIdMax()) - (await nft.currentTokenId()) - qty2

          await makeBid(
            admin,
            Number(remainingAmount),
            startAmount * remainingAmount,
          )

          await makeBid(bob, Number(qty2), startAmount * qty2)
          bobPaid = startAmount
        })

        it('should fail to claim refund when paused', async () => {
          await auction.connect(admin).pause()
          await expect(auction.connect(alice).claimRefund()).to.be.revertedWith(
            'Pausable: paused',
          )
        })

        it('should fail to claim refund before the auction is ended', async () => {
          await expect(
            auction.connect(alice).claimRefund(),
          ).to.be.revertedWithCustomError(auction, 'ClaimRefundNotReady')
        })

        it('should claim refund after the auction is ended and refundDelayTime passed', async () => {
          await increaseTime(twoHoursAndHalf)

          const settledPrice = await auction.getSettledPriceInWei()
          const beforeAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const beforeBobBalance = await ethers.provider.getBalance(bob.address)
          const tx1 = await auction.connect(alice).claimRefund()
          await auction.connect(bob).claimRefund()
          await expect(tx1).to.emit(auction, 'ClaimRefund')
          const afterAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const afterBobBalance = await ethers.provider.getBalance(bob.address)

          expect(afterAliceBalance).to.be.closeTo(
            beforeAliceBalance + (alicePaid - settledPrice) * 5n,
            parseEther('0.0001'),
          )
          expect(afterBobBalance).to.be.closeTo(
            beforeBobBalance + (bobPaid - settledPrice) * 3n,
            parseEther('0.0001'),
          )
        })

        it('should fail to claim refund twice', async () => {
          await increaseTime(twoHoursAndHalf)

          await auction.connect(alice).claimRefund()
          await auction.connect(bob).claimRefund()

          await expect(
            auction.connect(alice).claimRefund(),
          ).to.be.revertedWithCustomError(auction, 'UserAlreadyClaimed')
          await expect(
            auction.connect(bob).claimRefund(),
          ).to.be.revertedWithCustomError(auction, 'UserAlreadyClaimed')
        })
      })
    })

    describe('Admin Refund Users', () => {
      it('should fail to claim refund when config is not set', async () => {
        await expect(
          auction.connect(admin).refundUsers([alice.address, bob.address]),
        ).to.be.revertedWithCustomError(auction, 'ConfigNotSet')
      })

      describe('When config is set', () => {
        let alicePaid = 0n
        let bobPaid = 0n
        beforeEach(async () => {
          await auction
            .connect(admin)
            .setConfig(
              startAmount,
              endAmount,
              refundDelayTime,
              startTime,
              endTime,
            )
          const qty1 = 5
          await makeBid(alice, qty1, startAmount * BigInt(qty1))
          alicePaid = startAmount

          await increaseTime(anHour)

          const qty2 = 3
          const remainingAmount =
            Number((await nft.tokenIdMax()) - (await nft.currentTokenId())) -
            qty2

          await makeBid(
            admin,
            remainingAmount,
            startAmount * BigInt(remainingAmount),
          )

          await makeBid(bob, qty2, startAmount * BigInt(qty2))
          bobPaid = startAmount
        })

        it('should fail to refund users as non-admin', async () => {
          await expect(
            auction.connect(alice).refundUsers([bob.address]),
          ).to.be.revertedWith(
            `AccessControl: account ${alice.address.toLowerCase()} is missing role ${defaultAdminRole}`,
          )
        })

        it('should fail to refund users when paused', async () => {
          await auction.connect(admin).pause()
          await expect(
            auction.connect(admin).refundUsers([alice.address, bob.address]),
          ).to.be.revertedWith('Pausable: paused')
        })

        it('should fail to refund users before the auction is ended', async () => {
          await expect(
            auction.connect(admin).refundUsers([alice.address, bob.address]),
          ).to.be.revertedWithCustomError(auction, 'ClaimRefundNotReady')
        })

        it('should refund users after the auction is ended and refundDelayTime passed', async () => {
          await increaseTime(twoHoursAndHalf)
          const settledPrice = await auction.getSettledPriceInWei()

          const beforeAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const beforeBobBalance = await ethers.provider.getBalance(bob.address)
          const tx = await auction
            .connect(admin)
            .refundUsers([alice.address, bob.address])
          await expect(tx).to.emit(auction, 'ClaimRefund')
          const afterAliceBalance = await ethers.provider.getBalance(
            alice.address,
          )
          const afterBobBalance = await ethers.provider.getBalance(bob.address)
          expect(afterAliceBalance).to.be.closeTo(
            beforeAliceBalance + (alicePaid - settledPrice) * 5n,
            parseEther('0.001'),
          )
          expect(afterBobBalance).to.be.closeTo(
            beforeBobBalance + (bobPaid - settledPrice) * 3n,
            parseEther('0.001'),
          )
        })

        it('should fail to refund users twice', async () => {
          await increaseTime(twoHoursAndHalf)

          await auction.connect(admin).refundUsers([alice.address, bob.address])

          await expect(
            auction.connect(admin).refundUsers([alice.address, bob.address]),
          ).to.be.revertedWithCustomError(auction, 'UserAlreadyClaimed')
        })
      })
    })

    describe('Withdraw Funds', () => {
      let contractBalanceBefore = 0n
      beforeEach(async () => {
        contractBalanceBefore = await ethers.provider.getBalance(
          auction.getAddress(),
        )
        await auction.connect(admin).setConfig(
          startAmount,
          endAmount,

          refundDelayTime,
          startTime,
          endTime,
        )
        const qty1 = 5
        await makeBid(alice, qty1, startAmount * BigInt(qty1))
        await increaseTime(anHour)

        const qty2 = 3
        await makeBid(bob, qty2, startAmount * BigInt(qty2))
      })

      it('should fail to withdraw funds when auction is not ended', async () => {
        await expect(
          auction.connect(admin).withdrawFunds(),
        ).to.be.revertedWithCustomError(auction, 'NotEnded')
      })

      it('should fail to withdraw funds as non-admin', async () => {
        await increaseTime(2 * 3600)
        await expect(auction.connect(alice).withdrawFunds()).to.be.revertedWith(
          `AccessControl: account ${alice.address.toLowerCase()} is missing role ${defaultAdminRole}`,
        )
      })

      it('should withdraw funds', async () => {
        await increaseTime(2 * 3600)
        const settledPrice = await auction.getSettledPriceInWei()
        const beforeBalance = await ethers.provider.getBalance(treasury.address)
        await auction.connect(admin).withdrawFunds()
        const afterBalance = await ethers.provider.getBalance(treasury.address)
        expect(afterBalance).to.be.closeTo(
          beforeBalance + settledPrice * 8n,
          parseEther('0.01'),
        )
      })

      it('should have 0 eth after withdraw funds and refund users', async () => {
        await increaseTime(twoHoursAndHalf)
        const tx = await auction
          .connect(admin)
          .refundUsers([alice.address, bob.address])
        await expect(tx).to.emit(auction, 'ClaimRefund')

        await auction.connect(admin).withdrawFunds()
        const afterBalance = await ethers.provider.getBalance(
          auction.getAddress(),
        )
        expect(afterBalance).to.be.eq(contractBalanceBefore)
      })

      it('should fail to withdraw funds twice', async () => {
        await increaseTime(2 * 3600)
        await auction.connect(admin).withdrawFunds()
        await expect(
          auction.connect(admin).withdrawFunds(),
        ).to.be.revertedWithCustomError(auction, 'AlreadyWithdrawn')
      })
    })
  })

  describe('Discount list', () => {
    beforeEach(async () => {
      await auction
        .connect(admin)
        .setConfig(startAmount, endAmount, refundDelayTime, startTime, endTime)
    })
    it('fails if call setMerkleRoot without admin role', async () => {
      await expect(
        auction
          .connect(bob)
          .setMerkleRoot(
            '0x09485889b804a49c9e383c7966a2c480ab28a13a8345c4ebe0886a7478c0b73d',
          ),
      ).to.be.revertedWith(
        `AccessControl: account ${bob.address.toLowerCase()} is missing role ${await auction.DEFAULT_ADMIN_ROLE()}`,
      )
    })

    it('works if call setMerkleRoot with admin role', async () => {
      await expect(
        auction
          .connect(admin)
          .setMerkleRoot(
            '0x09485889b804a49c9e383c7966a2c480ab28a13a8345c4ebe0886a7478c0b73d',
          ),
      ).to.be.not.reverted
    })

    it('returns false when calling hasDiscount by a missing address', async () => {
      const merkleTree = createMerkletree([alice.address])
      const rootHash = getRootHash(merkleTree)
      await auction.connect(admin).setMerkleRoot(rootHash)

      const proof = getProof(merkleTree, bob.address)
      expect(await auction.connect(bob).hasDiscount(proof, bob.address)).to.be
        .false
    })

    it('returns true when calling hasDiscount by an allowed address', async () => {
      const merkleTree = createMerkletree([bob.address, alice.address])
      const rootHash = getRootHash(merkleTree)
      await auction.connect(admin).setMerkleRoot(rootHash)

      const proof = getProof(merkleTree, bob.address)
      expect(await auction.connect(bob).hasDiscount(proof, bob.address)).to.be
        .true
    })

    it('returns false when calling hasDiscount by an unallowed address', async () => {
      const merkleTree = createMerkletree([bob.address])
      const rootHash = getRootHash(merkleTree)
      await auction.connect(admin).setMerkleRoot(rootHash)

      const proof = getProof(merkleTree, alice.address)
      expect(await auction.connect(alice).hasDiscount(proof, alice.address)).to
        .be.false
    })

    it('should refund users with discount added for discount user list', async () => {
      const merkleTree = createMerkletree([alice.address, admin.address])
      const rootHash = getRootHash(merkleTree)
      await auction.connect(admin).setMerkleRoot(rootHash)

      const aliceProof = getProof(merkleTree, alice.address)
      const bobProof = getProof(merkleTree, bob.address)
      const qty1 = 5
      const qty2 = 3

      await makeBid(alice, qty1, startAmount * BigInt(qty1), false, aliceProof)
      const alicePaid = startAmount

      await increaseTime(anHour)
      const remainingAmount =
        Number((await nft.tokenIdMax()) - (await nft.currentTokenId())) - qty2

      await makeBid(
        admin,
        remainingAmount,
        startAmount * BigInt(remainingAmount),
      )

      await makeBid(bob, qty2, startAmount * BigInt(qty2), false, bobProof)
      const bobPaid = startAmount
      await increaseTime(twoHoursAndHalf)

      const settledPrice = await auction.getSettledPriceInWei()
      const settledPriceWithDiscount =
        await auction.getSettledPriceWithDiscountInWei()
      const beforeAliceBalance = await ethers.provider.getBalance(alice.address)
      const beforeBobBalance = await ethers.provider.getBalance(bob.address)
      const tx1 = await auction.connect(alice).claimRefund()
      await auction.connect(bob).claimRefund()
      await expect(tx1).to.emit(auction, 'ClaimRefund')
      const afterAliceBalance = await ethers.provider.getBalance(alice.address)
      const afterBobBalance = await ethers.provider.getBalance(bob.address)

      expect(afterAliceBalance).to.be.closeTo(
        beforeAliceBalance + (alicePaid - settledPriceWithDiscount) * 5n,
        parseEther('0.001'),
      )

      // test with refund calculation
      expect(afterBobBalance).to.be.closeTo(
        beforeBobBalance + (bobPaid - settledPrice) * 3n,
        parseEther('0.001'),
      )
    })

    it('should refund users with discount added for discount user list as admin', async () => {
      const merkleTree = createMerkletree([bob.address, admin.address])
      const rootHash = getRootHash(merkleTree)
      await auction.connect(admin).setMerkleRoot(rootHash)
      const aliceProof = getProof(merkleTree, alice.address)
      const bobProof = getProof(merkleTree, bob.address)

      const qty1 = 5
      const qty2 = 3

      await makeBid(alice, qty1, startAmount * BigInt(qty1), false, aliceProof)
      const alicePaid = startAmount

      await increaseTime(anHour)
      const remainingAmount =
        Number((await nft.tokenIdMax()) - (await nft.currentTokenId())) - qty2

      await makeBid(
        admin,
        remainingAmount,
        startAmount * BigInt(remainingAmount),
      )

      await makeBid(bob, qty2, startAmount * BigInt(qty2), false, bobProof)
      const bobPaid = startAmount
      await increaseTime(twoHoursAndHalf)

      const settledPrice = await auction.getSettledPriceInWei()
      const settledPriceWithDiscount =
        await auction.getSettledPriceWithDiscountInWei()
      const beforeAliceBalance = await ethers.provider.getBalance(alice.address)
      const beforeBobBalance = await ethers.provider.getBalance(bob.address)
      const tx1 = await auction
        .connect(admin)
        .refundUsers([alice.address, bob.address])
      await expect(tx1).to.emit(auction, 'ClaimRefund')
      const afterAliceBalance = await ethers.provider.getBalance(alice.address)
      const afterBobBalance = await ethers.provider.getBalance(bob.address)

      expect(afterAliceBalance).to.be.closeTo(
        beforeAliceBalance + (alicePaid - settledPrice) * 5n,
        parseEther('0.001'),
      )
      expect(afterBobBalance).to.be.closeTo(
        beforeBobBalance + (bobPaid - settledPriceWithDiscount) * 3n,
        parseEther('0.001'),
      )
      expect(afterBobBalance).to.be.closeTo(
        beforeBobBalance +
          (bobPaid - (settledPrice - (settledPrice * 10n) / 100n)) * 3n,
        parseEther('0.001'),
      )
    })

    it('calls withdrawFunds considering discounts', async () => {
      const merkleTree = createMerkletree([bob.address, admin.address])
      const rootHash = getRootHash(merkleTree)
      await auction.connect(admin).setMerkleRoot(rootHash)
      const aliceProof = getProof(merkleTree, alice.address)
      const bobProof = getProof(merkleTree, bob.address)

      const qty1 = 5n
      const qty2 = 3n

      await makeBid(
        alice,
        Number(qty1),
        startAmount * BigInt(qty1),
        false,
        aliceProof,
      )
      await increaseTime(anHour)
      const remainingAmount =
        (await nft.tokenIdMax()) - (await nft.currentTokenId()) - qty2
      await makeBid(
        admin,
        Number(remainingAmount),
        startAmount * BigInt(remainingAmount),
      )
      await makeBid(
        bob,
        Number(qty2),
        startAmount * BigInt(qty2),
        false,
        bobProof,
      )
      await increaseTime(twoHoursAndHalf)

      const settledPrice = await auction.getSettledPriceInWei()
      const settledPriceWithDiscount =
        await auction.getSettledPriceWithDiscountInWei()
      await auction.connect(admin).refundUsers([alice.address, bob.address])

      const soldNfts = await nft.currentTokenId()
      const soldWithoutDiscount = soldNfts - qty2

      const soldAmountWithoutDiscount = settledPrice * soldWithoutDiscount
      const soldAmountWithDiscount = settledPriceWithDiscount * qty2
      const amountTotal = soldAmountWithoutDiscount + soldAmountWithDiscount

      const beforeBalance = await ethers.provider.getBalance(treasury.address)
      await auction.connect(admin).withdrawFunds()
      const afterBalance = await ethers.provider.getBalance(treasury.address)

      expect(afterBalance).to.be.closeTo(
        beforeBalance + amountTotal,
        parseEther('0.001'),
      )
    })
  })
})
