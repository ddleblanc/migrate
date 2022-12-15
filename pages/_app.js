import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }) {


  return (
    <>
      <ThirdwebProvider desiredChainId={ChainId.BinanceSmartChainMainnet}>
            <ThemeProvider enableSystem={false} attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
        </ThirdwebProvider>
    </>
  );
}

export default MyApp;
