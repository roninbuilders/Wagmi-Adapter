import { createRoninConfig } from "@roninbuilders/wagmi-adapter";
import { http } from "viem";
import { ronin, saigon } from "viem/chains";
import type { WalletConnectParameters } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if(!projectId) throw Error("Project ID is undefined - get a project ID from WalletConnect Cloud")

const metadata: WalletConnectParameters['metadata'] = {
  name: 'playground',
  description: 'playground Example',
  url: 'https://playground.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
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