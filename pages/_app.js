import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { useTheme } from "next-themes";

function MyApp({ Component, pageProps }) {
  const { theme, setTheme } = useTheme();
  

  (function(){
    setTheme("dark");
})();

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
