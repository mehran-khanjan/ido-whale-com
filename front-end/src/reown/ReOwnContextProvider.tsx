'use client'

import {createAppKit} from '@reown/appkit/react'
import {EthersAdapter} from '@reown/appkit-adapter-ethers'
import {mainnet, bsc, bscTestnet} from '@reown/appkit/networks'
import {type ReactNode} from 'react';

// 1. project id:
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!projectId) {
    throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

// 2. Create a metadata object
const metadata = {
    name: 'IDO Whale',
    description: 'Do not miss any IDO',
    url: 'https://idowhale.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

// 3. Create the AppKit instance
createAppKit({
    adapters: [new EthersAdapter()],
    metadata,
    networks: [mainnet, bsc, bscTestnet],
    projectId,
    features: {
        analytics: true
    }
} as any)

const ContextProvider = ({children}: { children: ReactNode }) => {
    return (
        <>
            {children}
        </>
    )
}

export default ContextProvider;
