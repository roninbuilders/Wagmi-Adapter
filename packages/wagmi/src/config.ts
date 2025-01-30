import { type WalletConnectParameters, walletConnect } from 'wagmi/connectors'
import { Config, type CreateConfigParameters, createConfig } from 'wagmi'
import { WaypointProvider } from '@sky-mavis/waypoint'
import { injected } from 'wagmi/connectors'
import { RONIN } from './constants.js'
import { EIP1193Provider } from 'viem'

export function createRoninConfig({
	projectId,
	metadata,
	waypoint,
	...wagmiConfig
}: CreateConfigParameters & {
	projectId: WalletConnectParameters['projectId']
	metadata: WalletConnectParameters['metadata']
	waypoint?: {
		clientId: string
		chainId: number
	}
}): Config {
	if (waypoint) {
		const waypointConnector = injected({
			target() {
				return {
					id: RONIN.waypoint.id,
					name: RONIN.waypoint.name,
					provider: WaypointProvider.create({
						clientId: waypoint.clientId,
						chainId: waypoint.chainId,
					}) as EIP1193Provider,
				}
			},
		})

		return createConfig({
			...wagmiConfig,
			connectors: [walletConnect({ projectId, showQrModal: false, metadata }), waypointConnector],
			multiInjectedProviderDiscovery: true,
		})
	}
	return createConfig({
		...wagmiConfig,
		connectors: [walletConnect({ projectId, showQrModal: false, metadata })],
		multiInjectedProviderDiscovery: true,
	})
}
