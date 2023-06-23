import './App.css';
import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';
import CurrentBlock from './components/CurrentBlock';
import TxHash from './components/TxHash';


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

  const [address, setAddress] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);

  return (
    <div className="App">
      <div className='nav'>
        <h1 className="nav-brand">Web3 ETH Explorer</h1>
        <div className='nav-item'>
          <input type='text' value={address} placeholder='Search by address' onChange={(e) => setAddress(e.target.value)} />
          <button type='submit' onClick={() => setSearchClicked(!searchClicked)}>Search</button>
        </div>
      </div>
      <div className='Main'>
        <CurrentBlock />
        <br/>
        <TxHash />
      </div>
    </div>);
}

export default App;
