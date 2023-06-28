const ethers = require('ethers');
require('dotenv').config();
const hre = require("hardhat");

async function main() {

  // compile the contract
  await hre.run("compile");

  // Get the ContractFactory of Contract
  const Winner = await hre.ethers.getContractFactory("Winner");
  
  // Deploy the Contract
  const winner = await Winner.deploy();
  await winner.waitForDeployment();

  console.log(`Contract deployed to ${winner.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
