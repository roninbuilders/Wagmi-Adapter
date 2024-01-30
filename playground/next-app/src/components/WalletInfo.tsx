'use client'

import { useAccount, useDisconnect } from 'wagmi'

function WalletInfo() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  if(address) return (
    <>
      {"user connected as: " + address}
      <button onClick={()=>disconnect()}>Disconnect</button>
    </>
  )

  return null
}

export default WalletInfo