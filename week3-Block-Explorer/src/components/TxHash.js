import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
const alchemy = new Alchemy(settings);

// function returning details about a transaction hash
export default function TxHash() {

    // state variables
    const [txHash, setTxHash] = useState('');
    const [txObj, setTxObj] = useState({});

    // function to call getTransactionReceipt
    const getTxDetails = async () => {
        setTxObj(await alchemy.core.getTransactionReceipt(txHash))
      }

    return(
        <div className='tx-hash'>
            <h4>👇 Enter a transaction hash to get details about it</h4>
            <input type='text' value={txHash} placeholder='Enter tx hash' onChange={(e) =>  setTxHash(e.target.value)} />
            <button type='submit' onClick={getTxDetails}>Search</button>
            <div className='tx-obj'>
                <p><b>From 📤: </b>{txObj.from}</p>
                <p><b>To 📥: </b>{txObj.to}</p>
                <p><b>Status ⌛: </b>{txObj.status ? 'Success ✅' : (0 ? 'Failed ❌' : '')}</p>
                <p><b>Transaction Index 📇: </b>{txObj.transactionIndex}</p>
                <p><b>Confirmations 👍: </b>{txObj.confirmations}</p>
                <p><b>Type ⌨️: </b>{txObj.type}</p>
            </div>
        </div>
    )
}