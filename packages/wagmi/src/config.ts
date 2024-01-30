import { type WalletConnectParameters, walletConnect } from 'wagmi/connectors'
import { Config, type CreateConfigParameters, createConfig } from 'wagmi'

export function createRoninConfig({
	projectId,
  metadata,
	...wagmiConfig
}: CreateConfigParameters & { projectId: WalletConnectParameters['projectId'], metadata: WalletConnectParameters['metadata'] }): Config {
	return createConfig({
		...wagmiConfig,
		connectors: [walletConnect({ projectId, showQrModal: false, metadata })],
		multiInjectedProviderDiscovery: true,
	})
}
