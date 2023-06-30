// deploy.js
const hre = require('hardhat');

async function main () {
    const contractAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";

    const EmitWinner = await hre.ethers.getContractFactory("Winner");
    const emitWinner = await EmitWinner.deploy(contractAddress);

    await emitWinner.waitForDeployment();
    console.log(`Contract deployed at ${emitWinner.target}`);

    const result = await emitWinner.callWinner();
    console.log(result);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})