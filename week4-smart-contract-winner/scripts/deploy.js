const ethers = require('ethers');
require('dotenv').config();
const hre = require("hardhat");

async function main() {

  // compile the contract
  await hre.run("compile");

  // Get the ContractFactory of Contract
  const Contract = await hre.ethers.getContractFactory("Contract");
  
  // Deploy the Contract
  const contract = await Contract.deploy();
  await contract.waitForDeployment();

  console.log(`Contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
