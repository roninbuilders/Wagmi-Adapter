'use client'

import { useAccount, useDisconnect } from 'wagmi'

function WalletInfo() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  if(address) return "user connected as: " + address

  return <button onClick={()=>disconnect()}>Disconnect</button>
}

export default WalletInfo