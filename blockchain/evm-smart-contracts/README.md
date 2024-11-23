# IDO Whale Contracts

This project consists of two smart contracts.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
npx hardhat compile
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

After installing 'hardhat-deploy' and creating deploy folder:
```shell
npx hardhat --network bsc deploy
npx hardhat --network fantom deploy
```

To verify contract:
```shell
npx hardhat verify contract_address constructor_params --network bsc
```