import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Meta from "../components/Meta";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Meta title="Home" />
      <Provider store={store}>
      <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainMainnet}>
        <WagmiConfig client={client}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <ThemeProvider enableSystem={true} attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
          </SessionProvider>
        </WagmiConfig>
        </ThirdwebProvider>
      </Provider>
    </>
  );
}

export default MyApp;
