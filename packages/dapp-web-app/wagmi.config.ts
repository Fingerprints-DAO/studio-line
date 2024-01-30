import 'dotenv/config'
import { defineConfig } from '@wagmi/cli'
import { actions, react } from '@wagmi/cli/plugins'
import contracts from '@dapp/contracts'
import { Address } from 'viem'
import { getChainId } from './src/utils/chain'

console.log(getChainId())
export default defineConfig({
  out: './src/services/web3/generated.ts',
  contracts: [
    {
      name: 'line',
      abi: contracts.LineABI as any,
      address: contracts.contractAddresses[getChainId()].Line as Address,
    },
    //   {
    //     name: 'weth',
    //     abi: contracts.ERC20ABI as any,
    //   },
    //   {
    //     name: 'migration',
    //     abi: contracts.MigrationABI as any,
    //   },
    //   {
    //     name: 'membership',
    //     abi: contracts.MembershipABI as any,
    //   },
    //   {
    //     name: 'auction',
    //     abi: contracts.AuctionABI as any,
    //   },
  ],
  plugins: [
    react(),
    actions({
      prepareWriteContract: true,
      readContract: false,
    }),
  ],
})
