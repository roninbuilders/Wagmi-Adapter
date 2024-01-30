'use client'

import { useRoninConnect } from '@roninbulders/wagmi-adapter'

function ConnectBrowser() {
  const { connectBrowser, error, isError } = useRoninConnect()

  return (
    <>
      <button onClick={connectBrowser} >Connect Extension Wallet</button>
      {isError && error?.message}
    </>
  )
}

export default ConnectBrowser