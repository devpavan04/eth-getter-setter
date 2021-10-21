const hre = require('hardhat');
const fs = require('fs');
const contractData = require('../client/src/contract/contractData.json');

async function main() {
  if (hre.network.name === 'localhost') {
    console.log('Deploying contract to localhost...');
  } else {
    console.log(`Deploying contract to ${hre.network.name}...`);
  }

  const Contract = await hre.ethers.getContractFactory('GetterSetter');
  const contract = await Contract.deploy(100);
  await contract.deployed();
  console.log('Contract deployed at:', contract.address);

  const contractArtifact = await hre.artifacts.readArtifact('GetterSetter');

  contractData.address = contract.address;
  contractData.abi = contractArtifact.abi;

  fs.writeFileSync(
    './client/src/contract/contractData.json',
    JSON.stringify(contractData, null, 2),
    function writeJSON(err) {
      if (err) return console.log(err);
    }
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
