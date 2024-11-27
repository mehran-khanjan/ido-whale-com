import "@/assets/css/plugins.css";
import "@/assets/css/main.css";
import "@/assets/css/custom.css";
import type {AppProps} from "next/app";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
// import {createAppKit} from '@reown/appkit/react';
// import {EthersAdapter} from '@reown/appkit-adapter-ethers';
// import {mainnet, bsc, bscTestnet} from '@reown/appkit/networks';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cookieStorage, createStorage, http } from '@wagmi/core'
import {Web3Provider} from "@/components/shared/Web3Provider";
import CheckPreDefinedValues from "@/components/shared/CheckPreDefinedValues";
// import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 1.
// const queryClient = new QueryClient()
//
// const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
// if (!projectId) {
//     throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
// }
//
// const networks = [mainnet];
//
// const wagmiAdapter = new WagmiAdapter({
//     storage: createStorage({
//         storage: cookieStorage
//     }),
//     ssr: true,
//     projectId,
//     networks
// })

// 2. Create a metadata object
// const metadata = {
//     name: 'IDO Whale',
//     description: 'Do not miss any IDO',
//     url: 'https://idowhale.com', // origin must match your domain & subdomain
//     icons: ['https://avatars.mywebsite.com/']
// }

// 3. Create the AppKit instance
// createAppKit({
//     adapters: [new EthersAdapter()],
//     metadata,
//     networks: [mainnet],
//     projectId,
//     features: {
//         analytics: true
//     }
// })

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(
        <Web3Provider>

            <CheckPreDefinedValues/>

            <div className="main--area">
                <Component {...pageProps} />
            </div>
        </Web3Provider>
    );
}
