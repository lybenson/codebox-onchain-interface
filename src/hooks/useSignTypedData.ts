import { signTypedData } from '@wagmi/core'
import { useAccount, useChainId } from 'wagmi'
import type { Hex, TypedDataDomain } from 'viem'

export default function useSignTypedData() {
  const { address } = useAccount()
  const chainId = useChainId()
  console.log(chainId)

  const onSignTypedData = async () => {
    // 构造domain
    const domain: TypedDataDomain = {
      name: 'EIP712OrderVerify',
      version: '1',
      chainId: chainId,
      verifyingContract: '0x5b34a1420D906F2026d053D995A75C26907b0f64'
    }

    // 签名结构
    const types = {
      Order: [
        { name: 'isOrderAsk', type: 'bool' },
        { name: 'maker', type: 'address' },
        { name: 'token', type: 'address' },
        { name: 'price', type: 'uint256' },
        { name: 'amount', type: 'uint256' }
      ]
    }
    // 签名的数据
    const message = {
      isOrderAsk: true,
      maker: address,
      token: '0xC1E1C0Ab645Bd3C3156b20953784992013FDa98d',
      price: 100,
      amount: 10000000
    }

    // 712签名
    let signature = await signTypedData({
      domain: domain,
      message: message,
      primaryType: 'Order',
      types: types
    })
    signature = signature.slice(2) as Hex
    const r = `0x${signature.slice(0, 64)}`
    const s = `0x${signature.slice(64, 128)}`
    const v = `0x${signature.slice(128, 130)}`

    return {
      r,
      s,
      v
    }
  }

  return {
    onSignTypedData
  }
}

// TODO: 实现 EIP712 签名demo
