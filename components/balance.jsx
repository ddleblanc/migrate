import React, { useState, useEffect } from "react";
import Link from "next/link";
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
import { useRouter } from 'next/router';
import "react-tabs/style/react-tabs.css";
import Meta from "../components/Meta";
import { useMetamask, useAddress, useDisconnect, useContractRead, ConnectWallet, useContract } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";

export default function Balance() {
  const [balance, setBalance] = useState();
  const disconnect = useDisconnect();
  const realAddress = useAddress();



//   const { contract } = useContract("0x0469F8Ca65Ce318888cc0d6459d0c7cbe5912c98");
  const { contract, isLoading, error } = useContract("0x0469F8Ca65Ce318888cc0d6459d0c7cbe5912c98");

//   const { data, isLoading, error } = useContractRead(
//     contract,
//     "balanceOf",
//     realAddress
//   );



  useEffect(()=>{
    console.log(contract)
    const getBalance = async () => {
        return await contract.call("balanceOf", realAddress)
    }
        console.log("...")
        console.log(getBalance())
        setBalance(parseInt(getBalance()))
        // console.log(parseInt(getBalance()))
        // setBalance(parseInt(data))

  },[contract, realAddress])

  if(balance) {
    return (
        <>
            <button className="dark:bg-jacarta-900 dark:border-jacarta-600 border-jacarta-100 dark:hover:bg-jacarta-700 hover:bg-accent text-jacarta-700 mb-16 flex w-full items-center justify-center rounded-full border-2 bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent hover:text-white dark:text-white">
            <img src="/images/wallets/torus_24.svg" className="mr-2.5 inline-block h-6 w-6" alt="" />
            <span>{parseInt(data)}</span>
            </button>
        </>
      );
  }
};
