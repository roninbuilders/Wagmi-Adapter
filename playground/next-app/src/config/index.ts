import { createRoninConfig } from "@roninbulders/wagmi-adapter";
import { http } from "viem";
import { ronin, saigon } from "viem/chains";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
if(!projectId) throw Error("Project ID is undefined - get a project ID from WalletConnect Cloud")


export const config = createRoninConfig({
  projectId,
  chains: [ronin, saigon],
  transports: {
    [ronin.id]: http(),
    [saigon.id]: http(),
  },
})