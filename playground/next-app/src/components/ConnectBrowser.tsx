'use client'

import { useRoninConnect } from '@roninbuilders/wagmi-adapter/hooks'

function ConnectBrowser() {
  const { connectBrowser, isBrowser, error, isError } = useRoninConnect()

  if(!isBrowser){
    return <div>Ronin Extension Wallet not detected. Please install...</div>
  }

  return (
    <>
      <button onClick={connectBrowser} >Connect Extension Wallet</button>
      {isError && error?.message}
    </>
  )
}

export default ConnectBrowser