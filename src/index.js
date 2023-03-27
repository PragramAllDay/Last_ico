import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/css/fontawesome-all.min.css";
import "./assets/css/react-odometer-theme.css";
import "./assets/css/default.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { GlobalProvider } from "./ContextAPI/GlobalContext";
import "bootstrap/dist/js/bootstrap.bundle.min";


const { chains, provider } = configureChains(
  [mainnet],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'LAST ICO',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalProvider>
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains} theme={darkTheme({
          accentColor: '#00C4F4',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
          backgroundColor: '#00C4F4',
        })}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>
  </GlobalProvider>
);
