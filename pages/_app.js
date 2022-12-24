import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MetaMaskProvider } from "metamask-react";

function MyApp({ Component, pageProps }) {


  return (
    <>
    <Provider store={store}>
      <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainMainnet}>
            <ThemeProvider enableSystem={false} attribute="class">
            <MetaMaskProvider>
              <Component {...pageProps} />
              </MetaMaskProvider>
            </ThemeProvider>
        </ThirdwebProvider>
        </Provider>
    </>
  );
}

export default MyApp;
