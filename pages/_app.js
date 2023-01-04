import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps }) {


  return (
    <>
    <Provider store={store}>
    <MantineProvider  >
      <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainMainnet} autoConnect={true}>
            <ThemeProvider enableSystem={false} attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
        </ThirdwebProvider>
        </MantineProvider>
        </Provider>
    </>
  );
}

export default MyApp;
