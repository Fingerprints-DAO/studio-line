import fs from 'fs'
import { TASK_COMPILE, TASK_NODE } from 'hardhat/builtin-tasks/task-names'
import { task } from 'hardhat/config'
import { writeLogs } from './utils/_write-logs'

task(
  'run-local',
  'Start a hardhat node, deploy contracts, and execute setup transactions',
).setAction(async (_, { ethers, run }) => {
  const network = await ethers.provider.getNetwork()
  // const [deployer, DAOVault, bob, marcia] = await ethers.getSigners()

  const { chainId } = await ethers.provider.getNetwork()

  await run(TASK_COMPILE)

  await Promise.race([
    run(TASK_NODE, { hostname: '0.0.0.0' }),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ])

  const contracts = await run('deploy-local')

  // Run other tasks
  // await Promise.all([
  //   run('mint-nfts', {
  //     erc721Mock: contracts.ERC721Mock.instance.address,
  //     mintTo: DAOVault.address,
  //     qty: 100,
  //   }),
  // ])

  console.log(
    `arod.studio template contracts deployed to local node at http://localhost:8545 (Chain ID: ${chainId})`,
  )
  console.log(
    `ERC20 Mock ($PRINTS) address: ${await contracts.ERC20Mock.instance.getAddress()}`,
  )

  writeLogs(network.chainId, await contracts.ERC20Mock.instance?.getAddress())

  // Set local node mining interval
  await ethers.provider.send('evm_setIntervalMining', [12_000])

  await new Promise(() => {
    /* keep node alive until this process is killed */
  })
})
