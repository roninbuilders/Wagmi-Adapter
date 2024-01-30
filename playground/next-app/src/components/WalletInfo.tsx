'use client'

import { useAccount, useDisconnect } from 'wagmi'

function WalletInfo() {
  const { address, status } = useAccount()
  const { disconnect } = useDisconnect()

  if(address) return (
    <>
      {"user connected as: " + address}
      <button onClick={()=>disconnect()}>Disconnect</button>
      {status}
    </>
  )

  return status
}

export default WalletInfo