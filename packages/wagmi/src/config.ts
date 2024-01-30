import { walletConnect } from 'wagmi/connectors'
import { Config, CreateConfigParameters, createConfig } from 'wagmi'

export function createRoninConfig({
	projectId,
	...wagmiConfig
}: CreateConfigParameters & { projectId: string }): Config {
	return createConfig({
		...wagmiConfig,
		connectors: [walletConnect({ projectId, showQrModal: false })],
		multiInjectedProviderDiscovery: true,
	})
}
