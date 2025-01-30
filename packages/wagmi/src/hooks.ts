import { useCallback, useEffect, useMemo, useState } from 'react'
import { Connector, UseConnectParameters, UseConnectReturnType, useConnect } from 'wagmi'
import { RONIN, WALLETCONNECT } from './constants.js'
import { isMobile } from './utils.js'
import type { EthereumProvider } from '@walletconnect/ethereum-provider'

type HookReturnTypes = {
	isMobileReady: boolean
	prepareMobile: () => void
	openMobile: () => void
	connectBrowser: () => void
	connectWaypoint: () => void
	connectors: Connector[]
	isBrowser: boolean
	isMobile: boolean
	uri: string
} & Omit<UseConnectReturnType, 'connectors' | 'connect'>

export function useRoninConnect(params: UseConnectParameters = {}): HookReturnTypes {
	const { connect, connectors, ...states } = useConnect(params)

	const [uri, setUri] = useState('')

	const [browserConnector] = useMemo(() => {
		return connectors.filter(({ id }) => id === RONIN.rdns)
	}, [connectors])

	const [mobileConnector] = useMemo(() => {
		return connectors.filter(({ id }) => id === WALLETCONNECT.id)
	}, [connectors])

	const [waypointConnector] = useMemo(() => {
		return connectors.filter(({ id }) => id === RONIN.waypoint.id)
	}, [connectors])

	const prepareMobile = useCallback(() => {
		if (!mobileConnector) throw Error('WalletConnect Connector not found in prepareMobile function')

		setUri('')
		connect({ connector: mobileConnector })
	}, [mobileConnector])

	const openMobile = useCallback(() => {
		if (!uri) throw Error('URI is undefined')

		window.open(`${RONIN.deeplink}wc?uri=${encodeURIComponent(uri)}`, '_self')
	}, [uri])

	const connectBrowser = useCallback(() => {
		if (!mobileConnector) throw Error('mobileConnector not found in connectBrowser function')
		connect({ connector: browserConnector })
	}, [browserConnector])

	const connectWaypoint = useCallback(() => {
		if (!waypointConnector) throw Error('waypointConnector not found in connectWaypoint function')
		connect({ connector: waypointConnector })
	}, [waypointConnector])

	// Event listener for the WalletConnect URI
	useEffect(() => {
		if (mobileConnector) {
			;(async () => {
				const provider = (await mobileConnector.getProvider()) as InstanceType<typeof EthereumProvider>
				provider.on('display_uri', setUri)
			})()
		}
	}, [mobileConnector])

	return {
		...states,
		isMobileReady: Boolean(uri), // if URI get's populated deeplink can be opened.
		prepareMobile,
		openMobile,
		connectBrowser,
		connectWaypoint,
		connectors: [browserConnector, mobileConnector, waypointConnector],
		isBrowser: Boolean(browserConnector),
		isMobile: isMobile(),
		uri,
	}
}
