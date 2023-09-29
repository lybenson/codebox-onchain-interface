import Button from '@mui/material/Button'
import useSignTypedData from './hooks/useSignTypedData'
import { readContract } from 'wagmi/actions'
import EIP712OrderVerifyABI from './abi/EIP712OrderVerify.json'
import { useAccount } from 'wagmi'
function App() {
  const { onSignTypedData } = useSignTypedData()
  const { address } = useAccount()

  const handleSignTypedData = async () => {
    const { r, s, v } = await onSignTypedData()
    const message = {
      isOrderAsk: true,
      maker: address,
      token: '0xC1E1C0Ab645Bd3C3156b20953784992013FDa98d',
      price: 100,
      amount: 10000000
    }
    const tx = await readContract({
      abi: EIP712OrderVerifyABI,
      address: '0xa53d16D9F9F6d4F44536dE9c783ee4E09E901f34',
      functionName: 'verify',
      args: [message, address, v, r, s]
    })

    console.log(tx)
  }
  return (
    <>
      <Button
        variant='outlined'
        onClick={handleSignTypedData}
      >
        Sign Typed Data
      </Button>
    </>
  )
}

export default App
