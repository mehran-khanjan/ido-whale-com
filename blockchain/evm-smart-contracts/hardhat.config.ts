import {config as dotEnvConfig} from 'dotenv';
dotEnvConfig();
import {HardhatUserConfig} from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';

const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.26",
        settings: {
            viaIR: true,
            optimizer: {
                enabled: true,
                runs: 200,
            },
        }
    },
    networks: {
        bsc: {
            chainId: 56,
            url: "https://bsc-dataseed4.binance.org/",
            accounts: [process.env.WALLET_PRIVATE_KEY],
        },
        bscTestNet: {
            chainId: 97,
            url: "https://bsc-testnet-dataseed.bnbchain.org",
            accounts: [process.env.WALLET_PRIVATE_KEY],
        },
        fantom: {
            chainId: 250,
            url: "https://rpc.ftm.tools",
            accounts: [process.env.WALLET_PRIVATE_KEY]
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    etherscan: {
        apiKey: {
            bscTestnet: process.env.BSCSCAN_TESTNET_API_KEY,
            bsc: process.env.BSCSCAN_TESTNET_API_KEY,
            opera: process.env.FANTOM_API_KEY,
        }
    }
};

export default config;
