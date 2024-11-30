import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import {parseEther} from "viem";
import {expect} from "chai";

describe('Launchpad', () => {

    const deployFixture = async () => {

        const [owner, otherAccount] =
            await hre.ethers.getSigners();

        const launchpadContract =
            await hre.ethers.getContractFactory('Launchpad');

        const launchpad = await launchpadContract.deploy(
            'Test Title'
        );

        const tokenFactory = await hre.ethers.getContractFactory('TokenWithoutAudit');
        const token = await tokenFactory.deploy(
            'Test Token',
            'TT',
            21000000,
            18,
            1,
            2,
            3,
            4,
            owner,
            owner,
            owner
        );

        return {launchpad, token, owner, otherAccount}

    }

    describe('Deployment', () => {

        it('should deploy the contract correctly', async () => {

            // get contract data
            const {launchpad, owner} =
                await loadFixture(deployFixture);

            // check the title
            expect(await launchpad.idoTitle())
                .to.be.equal('Test Title');

            // check the owner
            expect(await launchpad.owner())
                .to.be.equal(owner.address);

        });

    });

    describe('Create Pool', () => {

        it('should revert if owner does not call', async () => {

            // get contract data
            const {launchpad, token, otherAccount, owner} =
                await loadFixture(deployFixture);

            // create a pool
            await expect(launchpad.connect(otherAccount).createPool(
                '',
                '',
                '',
                token.getAddress(),
                1000000,
                parseEther('10'),
                parseEther('100'),
                1,
                10,
                parseEther('0.1'),
                parseEther('10'),
                1737812776,
                1756561576,
                false,
                true
            )).to.be.revertedWithCustomError(launchpad, 'OwnableUnauthorizedAccount');
        })

        it('should provide correct values for the URL, title and description', async () => {

            // get contract data
            const {launchpad, token, otherAccount, owner} =
                await loadFixture(deployFixture);

            // create a pool
            await expect(launchpad.createPool(
                '',
                'title',
                'description',
                token.getAddress(),
                1000000,
                parseEther('10'),
                parseEther('100'),
                1,
                10,
                parseEther('0.1'),
                parseEther('10'),
                1737812776,
                1756561576,
                false,
                true
            )).to.be.revertedWith('Pool URL cannot be empty');
        })

        it('should provide correct values for the token address', async () => {

            // get contract data
            const {launchpad, token, otherAccount, owner} =
                await loadFixture(deployFixture);

            // create a pool
            await expect(launchpad.createPool(
                'url',
                'title',
                'description',
                '0x0000000000000000000000000000000000000000',
                1000000,
                parseEther('10'),
                parseEther('100'),
                1,
                10,
                parseEther('0.1'),
                parseEther('10'),
                1737812776,
                1756561576,
                false,
                true
            )).to.be.revertedWith('Pool token cannot be zero address');
        })

        it('should provide correct values for the token amount for pre-sale', async () => {

            // get contract data
            const {launchpad, token, otherAccount, owner} =
                await loadFixture(deployFixture);

            // create a pool
            await expect(launchpad.createPool(
                'url',
                'title',
                'description',
                token.getAddress(),
                parseEther('100000000'),
                parseEther('10'),
                parseEther('100'),
                1,
                10,
                parseEther('0.1'),
                parseEther('10'),
                1737812776,
                1756561576,
                false,
                true
            )).to.be.revertedWith('Your token balance is not enough');
        })

        it('should get approval for the token amount', async () => {

            // get contract data
            const {launchpad, token, otherAccount, owner} =
                await loadFixture(deployFixture);

            // create a pool
            await expect(launchpad.createPool(
                'url',
                'title',
                'description',
                token.getAddress(),
                parseEther('1000000'),
                parseEther('10'),
                parseEther('100'),
                1,
                10,
                parseEther('0.1'),
                parseEther('10'),
                1737812776,
                1756561576,
                false,
                true
            )).to.be.revertedWith('Get token approval first');
        })

        it('should have not any active pool with token', async () => {

            // get contract data
            const {launchpad, token, otherAccount, owner} =
                await loadFixture(deployFixture);

            // token amount for pre-sale
            const tokenAmount = parseEther('1000000');

            // get token approval
            const launchpadAddress = await launchpad.getAddress();
            await token.approve(launchpadAddress as any, tokenAmount as any);

            // create a pool for the first time
            await launchpad.createPool(
                'url',
                'title',
                'description',
                token.getAddress(),
                tokenAmount,
                parseEther('10'),
                parseEther('100'),
                1,
                10,
                parseEther('0.1'),
                parseEther('10'),
                1737812776,
                1756561576,
                false,
                true
            );

            // get token approval
            await token.approve(launchpadAddress as any, tokenAmount as any);

            // create a pool for the second time
            await expect(launchpad.createPool(
                'url',
                'title',
                'description',
                token.getAddress(),
                tokenAmount,
                parseEther('10'),
                parseEther('100'),
                1,
                10,
                parseEther('0.1'),
                parseEther('10'),
                1737812776,
                1756561576,
                false,
                true
            )).to.be.revertedWith('A pool for this token is already active');
        })

    })

})