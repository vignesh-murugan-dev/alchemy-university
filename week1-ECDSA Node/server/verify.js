const { secp256k1 } = require("ethereum-cryptography/secp256k1");

function verify(signature, messageHash, publicKey) {
    const sign = JSON.parse(signature);

    const isSigned = secp256k1.verify({ r: BigInt(sign.r), s: BigInt(sign.s) }, messageHash, publicKey);
    console.log(isSigned);
    return isSigned;
}

module.exports = verify;
