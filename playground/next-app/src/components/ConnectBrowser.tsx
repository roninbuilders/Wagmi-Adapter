'use client'

import { useRoninConnect } from '@roninbuilders/wagmi-adapter/hooks'

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