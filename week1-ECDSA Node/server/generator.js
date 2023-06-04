const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

// random private key generation
const privateKey = secp256k1.utils.randomPrivateKey();
console.log("private key", toHex(privateKey));

// public key generation from privation key
const publicKey = secp256k1.getPublicKey(privateKey);
console.log("public Key", toHex(publicKey));
