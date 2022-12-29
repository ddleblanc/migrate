import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }) {


  return (
    <>
    <Provider store={store}>
      <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainMainnet} autoConnect={true}>
            <ThemeProvider enableSystem={false} attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
        </ThirdwebProvider>
        </Provider>
    </>
  );
}

export default MyApp;
