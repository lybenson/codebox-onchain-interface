import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { Header } from './components/Header/index.tsx'

const { chains, publicClient } = configureChains(
  [mainnet, goerli],
  [
    alchemyProvider({ apiKey: 'sbqbOfyN8fUQUEiSvOqVDOsblAlm1jmC' }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
      <Header />
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
)
