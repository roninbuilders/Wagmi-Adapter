'use client'

import { useRoninConnect } from '@roninbulders/wagmi-adapter'
import React from 'react'
import { useAccount } from 'wagmi'

type Props = {}

function Connect({}: Props) {

  const { connectBrowser } = useRoninConnect()
  const { address } = useAccount()

  return (
    <>
    <button onClick={connectBrowser} >Connect Wallet</button>
    {
      address && "connected as: " + address
    }
    </>
  )
}

export default Connect