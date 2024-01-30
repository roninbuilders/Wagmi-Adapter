# Ronin Connectors

## Wagmi v2 Adapter

### Installation:

```sh
pnpm add --save-exact @roninbuilders/wagmi-adapter@0.0.0-alpha.1
```

- Wagmi package and its peers:

```sh
pnpm add wagmi viem @tanstack/react-query
```

### Configuration:

To start with Wagmi we'll replace `createConfig` function with `createRoninConfig`. We can pass all the wagmi configuration options except for the `connectors`, additionally we need to add two
WalletConnect options: `projectId` and `metadata`.

You can get a project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

```ts
import { createRoninConfig } from "@roninbuilders/wagmi-adapter";

import { http } from "viem";
import { ronin, saigon } from "viem/chains";
import { cookieStorage, createStorage } from "wagmi";
import type { WalletConnectParameters } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if(!projectId) throw Error("Project ID is undefined - get a project ID from WalletConnect Cloud")

const metadata: WalletConnectParameters['metadata'] = {
  name: 'My Website',
  url: 'https://mywebsite.com',
}

export const config = createRoninConfig({
  projectId,
  metadata,
  chains: [ronin, saigon],
  transports: {
    [ronin.id]: http(),
    [saigon.id]: http(),
  },
})
```

### useRoninConnect

The Wagmi adapter wraps the `useConnect` hook from Wagmi, you will need to use it to set up the configuration to connect with the Ronin extension wallet and the mobile app wallet:

> NOTE
> `useRoninConnect` is exported from `@roninbuilders/wagmi-adapter/hooks`

The `useRoninConnect` hook is an extension of the `useConnect` hook from Wagmi, so it will bypass most of the returns while overriding others

#### Extension Browser wallet:

use the `connectBrowser` to request a connection to the extension wallet, you can also use `isBrowser` to know if the user has the extension wallet installed or not

```ts
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
```

#### Mobile Wallet:

There are two ways to use the mobile wallet connector (WalletConnect v2 protocol), depending whether the user is on a Desktop or mobile environment.

- For Desktop:

1. call `prepareMobile` function to create a connection with the WalletConnect network, this will generate an URI
2. Once the URI is generated we can create a QR code with it

Here I'm using `react-qr-code` to generate the QR code from the URI, but you can use any other library.

```tsx
'use client'

import { useRoninConnect } from "@roninbuilders/wagmi-adapter/hooks"
import QRCode from "react-qr-code"

function ConnectMobile() {
  const { prepareMobile, uri, status } = useRoninConnect()

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
```

- For Mobile:

You can use the `isMobile` boolean to know if the user is on mobile or desktop.

1. call `prepareMobile` function to create a connection with the WalletConnect network, this will generate an URI
2. Once the URI is generated we open the Ronin wallet with its deeplink + the uri attached - all this is handled internally by the `openMobile` function

```tsx
'use client'

import { useRoninConnect } from "@roninbuilders/wagmi-adapter/hooks"
import QRCode from "react-qr-code"

function ConnectMobile() {
  const { openMobile, isMobileReady, isMobile, prepareMobile, uri, status } = useRoninConnect()

  //Mobile usage
  if(isMobile){
    return (
      <>
        { /* 1. call prepareMobile function to create a connection with the WalletConnect network, this will generate an URI */ }
        <button onClick={prepareMobile} >{ isMobileReady ? "Try again" : "prepare Mobile URI"}</button>

        { /* 2. Once the URI is generated we open the Ronin wallet with its deeplink + the uri attached - all this is handled internally by the openMobile function  */ }
        {isMobileReady && <button onClick={openMobile} >Connect Mobile Wallet</button>}
      </>
    )
  }

  //Desktop usage
  return (
    //...
  )
}

export default ConnectMobile
```