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
      <h1 className="title">Web3 ETH Explorer</h1>
      <div className='block-head'>
        <p><b>🚀Current Block📦⛏️: </b>{blockNumber}</p>
        <div className='block-details'>
          <h4>Block Details 👇👇👇</h4>
          <p><b>Hash#️⃣: </b>{block.hash}</p>
          <p><b>TimeStamp⌛: </b>{block.timestamp}</p>
          <p><b>Nonce🔢: </b>{block.nonce}</p>
          <p><b>Transactions🧮: </b>{txs.length} transactions in this block</p>
        </div>
        
      </div>
    </div>);
}

export default App;
