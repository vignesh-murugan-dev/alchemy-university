// deploy.js
const hre = require('hardhat');

async function main () {

    // address of the Contract to make function call
    const contractAddress = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";

    // Winner contract deployment part
    const EmitWinner = await hre.ethers.getContractFactory("Winner");
    const emitWinner = await EmitWinner.deploy(contractAddress); // initializing constructor with Contract address

    await emitWinner.waitForDeployment();
    console.log(`Contract deployed at ${emitWinner.target}`);
    // Winner contract deployed at 0xA663C2624463944Dcc98Cd71F748A1Cf2d367B64

    const result = await emitWinner.callWinner();
    console.log(result);
    // event emitted tx hash - 0xf03f6b41498b2b5bbde6740d41417361a748535da80040ff931cbe5aa314899a
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})