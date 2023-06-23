import './App.css';
import CurrentBlock from './components/CurrentBlock';
import TxHash from './components/TxHash';

function App() {

  return (
    <div className="App">
      <div className='nav'>
        <h1 className="nav-brand">Web3 ETH Explorer</h1>
      </div>
      <div className='Main'>
        <CurrentBlock />
        <br/>
        <TxHash />
      </div>
    </div>);
}

export default App;
