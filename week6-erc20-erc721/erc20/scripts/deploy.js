async function main() {
  
  const url = process.env.ALCHEMY_GOERLI_URL;

  let artifacts = await hre.artifacts.readArtifact("RoyalRumble");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a RoyalRumble Factory
  let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);

  let RoyalRumble = await factory.deploy();

  console.log("RoyalRumble token address:", RoyalRumble.address);

  await RoyalRumble.deployed();

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});