import { Address, erc20ABI } from '@wagmi/core'
import { useAccount } from 'wagmi'

import { multicall } from '@wagmi/core'
export default function useMultiCall() {
  const { address } = useAccount()
  const getTokenBalance = async () => {
    const USDTContract = {
      address: '0xdac17f958d2ee523a2206206994597c13d831ec7' as Address,
      abi: erc20ABI
    }

    const SHIBContract = {
      address: '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce' as Address,
      abi: erc20ABI
    }
    const data = await multicall({
      contracts: [
        {
          ...USDTContract,
          functionName: 'balanceOf',
          args: [address!]
        },
        {
          ...SHIBContract,
          functionName: 'balanceOf',
          args: [address!]
        }
      ]
    })

    console.log(data)
  }

  return {
    getTokenBalance
  }
}
