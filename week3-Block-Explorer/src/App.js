import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [block, setBlock] = useState({});
  const [txs, setTxs] = useState([]);
  const [txHash, setTxHash] = useState('');
  const [address, setAddress] = useState('');
  const [txObj, setTxObj] = useState({});

  const getTxDetails = async () => {
    setTxObj(await alchemy.core.getTransactionReceipt(txHash))
  }

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      setBlock(await alchemy.core.getBlock(blockNumber));
      setTxs((await alchemy.core.getBlock(blockNumber)).transactions);
    }

    getBlockNumber();
  }, []);

  return (
    <div className="App">
      <nav className='nav'>
        <h1 className="nav-brand">Web3 ETH Explorer</h1>
        <div className='nav-item'>
          <input type='text' value={address} placeholder='Search by address' onChange={(e) => setAddress(e.target.value)} />
          <button type='submit'>Search</button>
        </div>
      </nav>
      <div className='block-head'>
        
        <div className='block-details'>
          <h2>Current Block Details 👇👇👇</h2>
          <p><b>Block Height📦⛏️: </b><span>{blockNumber}</span></p>
          <p><b>Hash#️⃣: </b>{block.hash}</p>
          <p><b>TimeStamp⌛: </b>{block.timestamp}</p>
          <p><b>Nonce🔢: </b>{block.nonce}</p>
          <p><b>Transactions🧮: </b>{txs.length} transactions in this block</p>
        </div>
        <br/>
        <div className='txhash-details'>
          <h4>👇 Enter a transaction hash to get details about it</h4>
          <input type='text' value={txHash} placeholder='Enter tx hash' onChange={(e) => setTxHash(e.target.value)} />
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
      </div>
    </div>);
}

export default App;
