import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  // message hashing function
  function hashMessage(message){
    return toHex(keccak256(utf8ToBytes(message)));
  }

  // signing the transaction
  function signTransaction(evt) {
    evt.preventDefault();
    try{
      const message = { amount: parseInt(sendAmount),
        recipient };
      const hash = hashMessage(JSON.stringify(message));
      const privateKey = prompt(`Enter your Private Key to sign the transaction ${hash}`);
      
      let signature = secp256k1.sign(hash, privateKey);
      signature = JSON.stringify({...signature, r: signature.r.toString(), s: signature.s.toString()});

      if(!signature){
        alert("Enter valid Private Key");
        return;
      }
      else{
        verifySign(signature, hash);
      }
    }
    catch(err){
      alert(err.response.data.message);
    }
  }

  // verify the transaction
  function verifySign(signature, hash){
    let sign = JSON.parse(signature)
    const isSigned = secp256k1.verify({ r: BigInt(sign.r), s: BigInt(sign.s) }, hash, address);

    if(isSigned){
      transfer();
    }
    else{
      alert("Invalid Private Key!")
    }
  }

  // transfer to server
  async function transfer() {
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
      alert("Transaction Successful 🧙🏾‍♂️🪄")
    } 
    catch (err) {
      alert(err.response.data.message);
    }
  }

  return (
    <>
    <form className="container transfer" onSubmit={signTransaction}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
    </>
  );
}

export default Transfer;
