const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);
const name = "Mr. Otis Koelpin III";

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof
  });

  console.log({ gift });
}

main();

module.exports = name;