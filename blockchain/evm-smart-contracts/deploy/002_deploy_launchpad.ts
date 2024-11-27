import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;

    const {deployer} = await getNamedAccounts();

    await deploy('Launchpad', {
        from: deployer,
        args: ['Test Title'],
        log: true,
        // convert string to byte32 using this website:
        // https://www.devoven.com/encoding/string-to-bytes32
        deterministicDeployment: process.env.DETERMINISTIC_DEPLOYMENT_SALT_BYTE32
    });
};
export default func;
func.tags = ['Launchpad'];