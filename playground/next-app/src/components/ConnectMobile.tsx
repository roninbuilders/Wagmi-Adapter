'use client'

import { useRoninConnect } from "@roninbulders/wagmi-adapter"
import QRCode from "react-qr-code"

function ConnectMobile() {
  const { openMobile, isMobileReady, isMobile, prepareMobile, uri, status } = useRoninConnect()

  //Mobile usage
  if(isMobile){
    return (
      <>
        { /* 1. call prepareMobile function to create a connection with the WalletConnect network, this will generate an URI */ }
        <button onClick={prepareMobile} >{ isMobileReady ? "Try again" : "prepare Mobile URI"}</button>

        { /* 2. Once the URI is generated with open the Ronin wallet with its deeplink + the uri attached - all this is handled internally by the openMobile function  */ }
        {isMobileReady && <button onClick={openMobile} >Connect Mobile Wallet</button>}
      </>
    )
  }

  //Desktop usage
  return (
    <>
    { /*  1. call prepareMobile function to create a connection with the WalletConnect network, this will generate an URI  */ }
    <button onClick={prepareMobile}>generate URI</button>

    { /*  2. Once the URI is generated we can create a QR code with it  */ }
    { uri ? <QRCode value={uri} bgColor='#141414' fgColor='#ffffff' /> : ( status === 'pending' ? 'Loading...' : 'generate an URI by pressing the "generate URI" button' )}
    </>
  )
}

export default ConnectMobile