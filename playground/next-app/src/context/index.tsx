'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { type State, WagmiProvider } from 'wagmi'
import { config } from '../config'
import { ReactNode } from 'react'

const queryClient = new QueryClient() 

export default function ContextProvider({children}:{children: ReactNode, initialState?: State}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        {children}
      </QueryClientProvider> 
    </WagmiProvider>
  )
}