const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { ethers } = require("hardhat");
const { expect } = require('chai');

describe('Faucet', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const amount = ethers.utils.parseUnits("1", "ether");
    const provider = ethers.provider;
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy({ value: amount });
    const [owner, notOwner] = await ethers.getSigners();
    return { faucet, provider, owner, notOwner, amount };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above .1 ETH at a time', async function () {
    const { faucet, amount } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.withdraw(amount)).to.be.revertedWith("Amount too high");
  });

  it('should not allow NOT OWNER to withdraw all funds', async function () {
    const { faucet, notOwner } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(notOwner).withdrawAll()).to.be.revertedWith('Not owner');
  });

  it('should allow OWNER to withdraw the contract balance', async function () {
    const { faucet, owner, amount } = await loadFixture(deployContractAndSetVariables);
    await expect(() => faucet.withdrawAll()).to.changeEtherBalance(owner, amount);
  });

  it('should not allow NOT OWNER to destroy faucet', async function () {
    const { faucet, notOwner } = await loadFixture(deployContractAndSetVariables);
    await expect(faucet.connect(notOwner).destroyFaucet()).to.be.revertedWith('Not owner');
  });

  it('should allow OWNER to destroy faucet', async function () {
    const { faucet, provider } = await loadFixture(deployContractAndSetVariables);
    await faucet.destroyFaucet();
    expect(await provider.getCode(faucet.address)).to.hexEqual('0x');
  });
});