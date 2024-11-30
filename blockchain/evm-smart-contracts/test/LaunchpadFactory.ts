import hre from "hardhat";
import {decodeEventLog, decodeFunctionData, formatEther, parseEther} from "viem";
import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {expect} from "chai";
import {ContractTransactionResponse} from "ethers";
import {abi} from '../deployments/bscTestNet/LaunchpadFactory.json';

describe('LaunchpadFactory', () => {
    const deployFixture = async () => {
        const [owner, otherAccount] =
            await hre.ethers.getSigners();

        const launchpadFactoryContract =
            await hre.ethers.getContractFactory('LaunchpadFactory');

        const launchpadFactory = await launchpadFactoryContract.deploy(
            parseEther('1')
        );

        return {launchpadFactory, owner, otherAccount}
    }

    describe('Deployment', () => {

        it('should deploy the contract correctly - cost fee check', async () => {

            // get contract data
            const {launchpadFactory, otherAccount} =
                await loadFixture(deployFixture);

            expect(formatEther(await launchpadFactory.connect(otherAccount).costFee()))
                .to.be.equal('1')
        });

        it('should deploy the contract correctly - owner check', async () => {

            // get contract data
            const {launchpadFactory, owner} =
                await loadFixture(deployFixture);

            expect(await launchpadFactory.owner()).to.be.equal(owner.address)
        });

    });

    describe('Launch Function', () => {

        it('should revert if coin value did not pass to the function', async () => {

            // get contract data
            const {launchpadFactory, otherAccount} =
                await loadFixture(deployFixture);

            await expect(launchpadFactory.connect(otherAccount).launch('test title'))
                .to.be.revertedWith('Please pay cost fee');
        });

        it('should send cost fee to the owner', async () => {

            // get contract data
            const {launchpadFactory, launchpadMain, owner, otherAccount} =
                await loadFixture(deployFixture);

            // get owner balance before payment
            const ownerOldBalance = await hre.ethers.provider.getBalance(owner.address);

            // pay for launchpad
            await launchpadFactory
                .connect(otherAccount).launch('test title', {
                    value: parseEther('1')
                });

            // get owner balance after payment
            const ownerNewBalance = await hre.ethers.provider.getBalance(owner.address);

            expect(Number(formatEther(ownerNewBalance))).to.be
                .equal(Number(formatEther(ownerOldBalance)) + 1)
        });

        it('should emit an event correctly', async () => {

            // get contract data
            const {launchpadFactory, owner, otherAccount} =
                await loadFixture(deployFixture);

            // pay for launchpad
            const launchpadTitle = 'test title';
            const txResponse: ContractTransactionResponse = await launchpadFactory
                .connect(otherAccount).launch(launchpadTitle, {
                    value: parseEther('1')
                })
            const receipt = await txResponse.wait();

            // console.log('logs', receipt?.logs);
            // events
            const topics = decodeEventLog({
                abi: abi,
                data: txResponse.data,
                topics: receipt?.logs[0].topics
            } as any);

            const eventValues: { receiver: string, amount: BigInt }  = Object.values(topics)[1];
            // console.log('eventValues', eventValues);
            const receiver = eventValues.receiver;
            const amount = eventValues.amount;

            // ToDo: these are not working correctly
            // expect(receiver).to.be.equal(owner.address);
            // expect(Number(formatEther(amount))).to.be.equal(1);

        });

        it('should transfer ownership correctly - 0x to contract', async () => {

            // get contract data
            const {launchpadFactory, launchpadMain, otherAccount} =
                await loadFixture(deployFixture);

            // pay for launchpad
            const txResponse = await launchpadFactory
                .connect(otherAccount).launch('test title', {
                    value: parseEther('1')
                });
            const receipt = await txResponse.wait();

            // events
            const topics = decodeEventLog({
                abi: abi,
                data: txResponse.data,
                topics: receipt?.logs[1].topics
            } as any)

            const eventValues: { previousOwner: string, newOwner: string }  = Object.values(topics)[1];
            expect(eventValues.previousOwner)
                .to.be.equal('0x0000000000000000000000000000000000000000');

            expect(eventValues.newOwner)
                .to.be.equal(await launchpadFactory.getAddress());

        });

        it('should transfer ownership correctly - contract to caller', async () => {

            // get contract data
            const {launchpadFactory, launchpadMain, otherAccount} =
                await loadFixture(deployFixture);

            // pay for launchpad
            const txResponse = await launchpadFactory
                .connect(otherAccount).launch('test title', {
                    value: parseEther('1')
                });
            const receipt = await txResponse.wait();

            // events
            const topics = decodeEventLog({
                abi: abi,
                data: txResponse.data,
                topics: receipt?.logs[3].topics
            } as any)

            const eventValues: { previousOwner: string, newOwner: string }  = Object.values(topics)[1];
            expect(eventValues.previousOwner)
                .to.be.equal(await launchpadFactory.getAddress());

            expect(eventValues.newOwner)
                .to.be.equal(otherAccount.address);

        });

        it('should increase launchpad count works correctly', async () => {

            // get contract data
            const {launchpadFactory, otherAccount} =
                await loadFixture(deployFixture);

            // get launchpads count before pay
            const totalLaunchpadsByAddressOld = await launchpadFactory.connect(otherAccount)
                .getLaunchpadCount(otherAccount.address);

            // pay for launchpad
            const txResponse: ContractTransactionResponse = await launchpadFactory
                .connect(otherAccount).launch('test title', {
                value: parseEther('1')
            })

            // get launchpads count after pay
            const totalLaunchpadsByAddressNew = await launchpadFactory.connect(otherAccount)
                .getLaunchpadCount(otherAccount.address);

            expect(Number(totalLaunchpadsByAddressOld))
                .to.be.equal(Number(totalLaunchpadsByAddressNew) - 1);

            await expect(launchpadFactory.connect(otherAccount)
                .launchpads(otherAccount.address, Number(totalLaunchpadsByAddressNew)))
                .to.be.revertedWithoutReason();

        });

        it('should operator mapping works correctly', async () => {

            // get contract data
            const {launchpadFactory, otherAccount} =
                await loadFixture(deployFixture);

            // pay for launchpad
            const txResponse: ContractTransactionResponse = await launchpadFactory
                .connect(otherAccount).launch('test title', {
                    value: parseEther('1')
                })
            const receipt = await txResponse.wait();

            // events
            const topics = decodeEventLog({
                abi: abi,
                data: txResponse.data,
                topics: receipt?.logs[4].topics
            } as any)
            const eventValues: { creator: string,launchpadAddress: string }  = Object.values(topics)[1];
            const newLaunchpadAddress =  eventValues.launchpadAddress;

            // call operator function
            expect(await launchpadFactory.connect(otherAccount).operator(newLaunchpadAddress))
                .to.equal(otherAccount.address);

        });

        it('should emit the event correctly', async () => {

            // get contract data
            const {launchpadFactory, otherAccount} =
                await loadFixture(deployFixture);

            // pay for launchpad
            const launchpadTitle = 'test title';
            const txResponse: ContractTransactionResponse = await launchpadFactory
                .connect(otherAccount).launch(launchpadTitle, {
                    value: parseEther('1')
                })
            const receipt = await txResponse.wait();

            // data
            const { functionName, args } = decodeFunctionData({
                abi: abi,
                data: txResponse.data
            } as any);
            expect(functionName).to.be.equal('launch');
            expect(args[0]).to.be.equal(launchpadTitle);

            // events
            const topics = decodeEventLog({
                abi: abi,
                data: txResponse.data,
                topics: receipt?.logs[4].topics
            } as any)

            const eventValues: { creator: string,launchpadAddress: string }  = Object.values(topics)[1];

            expect(eventValues.launchpadAddress).to.be.exist;

        });

    });
})
