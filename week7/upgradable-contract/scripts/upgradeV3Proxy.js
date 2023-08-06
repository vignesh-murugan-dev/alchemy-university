const { ethers, upgrades } = require('hardhat');

// TO DO: Place the address of your proxy here!
const proxyAddress = '0xe4f65F3dd458129F5005945DEaa40622fd16AF25';

async function main() {
  const VendingMachineV3 = await ethers.getContractFactory('VendingMachineV3');
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV3);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  
  const owner = await upgraded.owner();
  console.log("The current contract owner is: " + owner);

  console.log('Implementation contract address: ' + implementationAddress);
}

main();