import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import "react-tabs/style/react-tabs.css";
import Confetti from "../components/confetti";
import { useDisconnect, ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";


export default function Home() {
  const { theme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [balance, setBalance] = useState();
  const [balanceHex, setBalanceHex] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [approvalMsg, setApprovalMsg] = useState();
  const [isMigrated, setIsMigrated] = useState(false)
  const [tierOfReward, setTierOfReward] = useState()
  const [balanceMsg, setBalanceMsg] = useState();
  const disconnect = useDisconnect();
  if (theme === "dark") setTheme("light");

  const disconnectWallet = async () => {
    disconnect()
    setBalance(null)
  }

  const realAddress = useAddress();

  // Test Address
  // const realAddress = "0x4dD09411C26AC009AEF664C1dD63282Cb9439F6c";

  const migrationContract = "0x0469F8Ca65Ce318888cc0d6459d0c7cbe5912c98";
	const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_maxTxAmount","type":"uint256"}],"name":"MaxTxAmountUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"enabled","type":"bool"}],"name":"ProjectFundingEnabledUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":true,"internalType":"address","name":"address01","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount01","type":"uint256"},{"indexed":true,"internalType":"address","name":"address02","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount02","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensSentToCommunityWallet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint256","name":"maxTxPercent","type":"uint256"}],"name":"A_setMaxTxPercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"truefalse","type":"bool"}],"name":"E1_enableFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"truefalse","type":"bool"}],"name":"E2_enable_ProjectFunding","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"onoff","type":"bool"}],"name":"E3_enableAntiDump","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"truefalse","type":"bool"}],"name":"E4_enableTrading","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"marketingfee","type":"uint256"}],"name":"F01_setMarketingFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"buybackfee","type":"uint256"}],"name":"F02_setBuyBackfee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"buyTaxFee","type":"uint256"}],"name":"F06_setBuyTaxfee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"taxFee","type":"uint256"}],"name":"F07_setTaxFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"ProjectFee","type":"uint256"}],"name":"F08_setProjectFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellTaxFeeA","type":"uint256"}],"name":"F09_setSellTaxFeeA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellTaxFeeB","type":"uint256"}],"name":"F10_setSellTaxFeeB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"transferTaxFee","type":"uint256"}],"name":"F11_setTransferTaxFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"buyProjectFee","type":"uint256"}],"name":"F12_setBuyProjectFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellProjectFeeA","type":"uint256"}],"name":"F13_setSellProjectFeeA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sellProjectFeeB","type":"uint256"}],"name":"F14_setSellProjectFeeB","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"transferProjectFee","type":"uint256"}],"name":"F15_setTransferProjectFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"exchangeTaxFee","type":"uint256"}],"name":"F16_setExchangeTaxFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"exchangeProjectFee","type":"uint256"}],"name":"F17_setExchangeProjectFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"impact1","type":"uint256"}],"name":"I1_setImpact1","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"impact2","type":"uint256"}],"name":"I2_setImpact2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxSellAttempts","type":"uint256"}],"name":"I3_setMaxSellAttempts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sell_Window","type":"uint256"}],"name":"I4_setSellWindow","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sell_InitialWait","type":"uint256"}],"name":"I5_setSellInitialWait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"sell_FurtherWait","type":"uint256"}],"name":"I6_setSellFurtherWait","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ProjectFundingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"S01_includeInFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"S02_excludeFromFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"S03_includeInReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"S04_excludeFromReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"S05_addToBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"S06_removeFromBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"S07_addAllowedExchange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"S08_removeAllowedExchange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"S09_isAllowedExchange","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"Allowed_Bridges","type":"bool"},{"internalType":"uint256","name":"liq_fee","type":"uint256"},{"internalType":"uint256","name":"tax_fee","type":"uint256"}],"name":"S10_addBridge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"S11_removeBridge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"W1_setMarketingWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"W2_setBuybackWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"W3_setCommunityrewardsWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"W3_setMigrationsWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"Z_transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"_buyLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_buyTaxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_buybackFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_buybackWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_communityRewardsWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_exchangeLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_exchangeTaxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_impact1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_impact2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_marketingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_marketingWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxSellAttempts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_migrationWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_sellLiquidityFeeA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_sellLiquidityFeeB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_sellTaxFeeA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_sellTaxFeeB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_sell_FurtherWait","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_sell_InitialWait","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_sell_Window","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_taxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_transferLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_transferTaxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkAntiDumpEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feesEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"geUnlockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getAllowedBridges","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getBridgeLiquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getBridgeTaxFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"get_HodlingDuration","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isExcludedFromReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tAmount","type":"uint256"},{"internalType":"bool","name":"deductTransferFee","type":"bool"},{"internalType":"address","name":"to","type":"address"}],"name":"reflectionFromToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rAmount","type":"uint256"}],"name":"tokenFromReflection","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFees","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tradingEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uniswapV2Pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswapV2Router","outputs":[{"internalType":"contract IUniswapV2Router02","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
  

  const approvalContract = "0x061251CE89D67115c68bbA086a7ec77323078217";
  const approvalAbi = [{"inputs":[{"internalType":"address","name":"_oldtoken","type":"address"},{"internalType":"address","name":"_newtoken","type":"address"},{"internalType":"address","name":"_nft","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_sent","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_newvalue","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_received","type":"uint256"}],"name":"migrate_tokens","type":"event"},{"inputs":[],"name":"NFT","outputs":[{"internalType":"contract IERC1155","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_division","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_factor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve_newtoken_transfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"truefalse","type":"bool"}],"name":"enable_migration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"get_token_amounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migration_enabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"new_token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"old_token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ops","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"factor","type":"uint256"},{"internalType":"uint256","name":"division","type":"uint256"}],"name":"set_factor_values","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"set_operator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tier2","type":"uint256"},{"internalType":"uint256","name":"tier3","type":"uint256"},{"internalType":"uint256","name":"tier4","type":"uint256"}],"name":"set_tier_amounts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tier2_amount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tier3_amount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tier4_amount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
  
  const networkChanged = (res) => {
    console.log({ res });
  };

  // useEffect(() => {
  //   if (!window.ethereum) throw new Error("No crypto wallet found");
  //   window.ethereum.on("confirmation", networkChanged);

  //   return () => {
  //     window.ethereum.removeListener("chainChanged", networkChanged);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!window.ethereum) throw new Error("No crypto wallet found");
  //   window.ethereum.on("receipt", networkChanged);

  //   return () => {
  //     window.ethereum.removeListener("receipt", networkChanged);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!window.ethereum) throw new Error("No crypto wallet found");
  //   window.ethereum.on("error", networkChanged);

  //   return () => {
  //     window.ethereum.removeListener("error", networkChanged);
  //   };
  // }, []);


  return (
    <div>
      {/* <!-- Login --> */}
      <section className="relative h-screen">
        <div className="lg:flex h-full">
          {/* <!-- Left --> */}
          <div className="relative text-center lg:w-1/2 h-1/2 lg:h-[100%]">
            <img
              src="/images/login.webp"
              alt="login"
              className="absolute h-full w-full object-cover"
            />
            {/* <!-- Logo --> */}
            <Link href="/">
              <a className="relative inline-block py-36">
                <img
                  src="/images/logo_white.png"
                  className="inline-block max-h-7"
                  alt="hyperchainx | NFT Marketplace"
                />
              </a>
            </Link>
          </div>

          {/* <!-- Right --> */}
          <div className="relative flex items-center justify-center p-[10%] lg:w-1/2 h-1/2 lg:h-[100%]">
            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
              <img
                src="/images/gradient_light.jpg"
                alt="gradient"
                className="h-full w-full"
              />
            </picture>

            <div className="w-full max-w-[25.625rem] text-center">
              <h1 className="text-jacarta-700 font-display mb-6 text-4xl dark:text-white">
                Migration
              </h1>
              <p className="dark:text-jacarta-300 mb-16 text-lg leading-normal">
                <a href="https://t.me/hyperchainx" className="text-sm">
                  Need support?
                </a>
              </p>

              {/* {balance && 
                <Approve balance={balance} />
              }  */}

              {/* <!-- Tabs Nav --> */}
              <div>
                  {balance && 
                    <button className="dark:bg-jacarta-900 dark:border-jacarta-600 border-jacarta-100 dark:hover:bg-jacarta-700 hover:bg-accent text-jacarta-700 mb-16 flex w-full items-center justify-center rounded-full border-2 bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent hover:text-white dark:text-white">
                      <img
                        src="/images/wallets/torus_24.svg"
                        className="mr-2.5 inline-block h-6 w-6"
                        alt=""
                      />
                      <span>{balance}</span>
                    </button>
                  }          
              <ConnectWallet />
                  {/* {!realAddress &&
                    <button onClick={connectWithMetamask} className="dark:bg-jacarta-800  dark:hover:bg-jacarta-700 hover:bg-jacarta-50 text-jacarta-700 mb-4 flex w-full items-center justify-center rounded-full bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent dark:text-white dark:hover:border-transparent">
                      <img
                        src="/images/wallets/torus_24.svg"
                        className="mr-2.5 inline-block h-6 w-6"
                        alt=""
                      />
                      <span>Login with Metamask</span>
                    </button>
                  } */}
                    {realAddress &&
                    !balance &&
                    <>
                    <Web3Button
                      contractAddress={migrationContract}
                      contractAbi={abi}
                      action={(contract) =>
                        contract.call("balanceOf", realAddress)
                      }
                      onSuccess={(res)=>{
                        console.log(parseInt(res))
                        if(parseInt(res) > 0) {
                          setBalance(parseInt(res))
                          setBalanceHex(res)
                        } else {
                          setIsVisible(true)
                          setBalanceMsg("Insufficient Funds")
                          setTimeout(()=>{
                            setBalanceMsg(null)
                          }, 3000)
                        }
                      }}
                      onError={(res)=>{
                        console.log(res)
                      }}
                      onSubmit={(res)=>{
                        console.log("Calling balanceOf")
                      }}
                      >
                      {balanceMsg ? balanceMsg : "Get Balance"}
                    </Web3Button> 
                    {isVisible && <Confetti />}   
                    </>    
                    }
                    {realAddress &&
                    balance &&
                    !isApproved &&  
                      <Web3Button
                      contractAddress={migrationContract}
                      contractAbi={approvalAbi}
                      action={(contract) =>{
                        contract.call("approve", approvalContract, balanceHex).catch((err)=>{
                          setIsApproved(false)
                        }).then((res)=>{
                          if(res.receipt.status !== 1) return
                          setIsApproved(true)
                          // console.log(res.receipt.status)
                        })
                      }
                      }
                      onSuccess={(res)=>{
                        console.log(`onSucces returns ${res}`)
                      }}
                      onError={(res)=>{
                        setIsApproved(false)
                        console.log('approval error')
                      }}
                      onSubmit={()=>{
                        console.log("address")
                      }}
                      >
                      approve
                    </Web3Button>
                    }
                    {realAddress &&
                    balance &&
                    isApproved &&
                    !isMigrated &&
                    <>
                      <Web3Button
                      contractAddress={approvalContract}
                      contractAbi={approvalAbi}
                      action={(contract) =>{
                        contract.call("migrate").catch((err)=>{
                          console.log(err)
                          setIsApproved(false)
                        }).then((res)=>{
                          if(res.receipt.status !== 1) return
                          setIsVisible(true)
                          setIsMigrated(true)
                          console.log("migration successful")
                          console.log(res)
                          // console.log(res.receipt.status)
                        })
                      }
                      }
                      onSuccess={(res)=>{
                        setBalance("Migration Succesful")
                      }}
                      onError={(res)=>{
                        console.log(res)
                      }}
                      onSubmit={()=>{
                        console.log("address")
                      }}
                      >
                      Migrate
                    </Web3Button>
                    {isVisible && <Confetti />}
                    </>
                    }
                    {isMigrated &&
                    <Web3Button
                      contractAddress={"0x184e09df5be5d3f26c8595dc523b6cf79cc1d7fc"}
                      action={(contract) =>
                        contract.call("balanceOfBatch", [realAddress, realAddress, realAddress, realAddress, realAddress, realAddress, realAddress], [1,2,3,4,5,6,7])
                      }
                      onSuccess={(res)=>{
                        for(let i = 0; i > res.length; i++){
                          if(parseInt(res[i]) > 0) {
                            setTierOfReward(parseInt(res[i]))
                          }
                        }
                        console.log({tier: tierOfReward})     
                      }}
                      onError={(res)=>{
                        console.log(res)
                      }}
                      onSubmit={(res)=>{
                        console.log("Calling balanceOf")
                      }}
                      >
                      {tierOfReward ? `Tier: ${tierOfReward}` : "Reveal Reward"}
                    </Web3Button>
                    }
                  </div>
              {realAddress && 
              <div className="dark:text-jacarta-300 mb-10 mt-4 text-md leading-normal">
                <span onClick={disconnectWallet} className="cursor-pointer hover:text-white">
                  Disconnect Wallet
              </span>
              </div>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
