import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// rainbowkit wallet 
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [
    alchemyProvider({ apiKey: 's7ypqu8C6n0h2UrXk-o2ZHbFMFJoGq9j' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'erc20-indexer',
  projectId: '1',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} coolMode >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </>,
)
