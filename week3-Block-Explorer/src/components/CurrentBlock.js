import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
const alchemy = new Alchemy(settings);


export default function CurrentBlock () { 
    const [blockNumber, setBlockNumber] = useState(0);
    const [block, setBlock] = useState({});
    const [txs, setTxs] = useState([]);
    
    useEffect(() => {
        async function getBlockNumber() {
          setBlockNumber(await alchemy.core.getBlockNumber());
          setBlock(await alchemy.core.getBlock(blockNumber));
          setTxs((await alchemy.core.getBlock(blockNumber)).transactions);
        }
        getBlockNumber();
      }, [blockNumber]);

    return(
        <div className='current-block'>
            <h2>Current Block Details 👇👇👇</h2>
            <p><b>Block Height📦⛏️: </b><span>{blockNumber}</span></p>
            <p><b>Hash#️⃣: </b>{block.hash}</p>
            <p><b>TimeStamp⌛: </b>{block.timestamp}</p>
            <p><b>Nonce🔢: </b>{block.nonce}</p>
            <p><b>Transactions🧮: </b>{txs.length} transactions in this block</p>
        </div>
    )
}