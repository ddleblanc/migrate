import React, { useState } from "react";
import Link from "next/link";
import Confetti from "../components/confetti";
import { useDisconnect, ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import { migrationContract, abi, approvalContract, approvalAbi} from "../components/contracts";
import { useTheme } from "next-themes";
import WalletButton from "../components/wallet-btn/WalletButton";
import { useMetaMask } from "metamask-react";


export default function Home() {
  const { status, connect, chainId, ethereum } = useMetaMask();
  const [isVisible, setIsVisible] = useState(false);
  const [balance, setBalance] = useState();
  const [balanceHex, setBalanceHex] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [isMigrated, setIsMigrated] = useState(false)
  const [tierOfReward, setTierOfReward] = useState()
  const [balanceMsg, setBalanceMsg] = useState();
  const disconnect = useDisconnect();
  const { theme, setTheme } = useTheme();
  (function(){
    setTheme("dark");
})();

  const disconnectWallet = async () => {
    disconnect()
    setBalance(null)
  }

  const realAddress = account;
  
  return (
    <div>
                  {/* <ConnectWallet /> */}
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
                 {/* {!realAddress &&
                    <button onClick={connectWithMetamask} className="dark:bg-jacarta-800  dark:hover:bg-jacarta-700 hover:bg-jacarta-50 text-jacarta-700 mb-4 flex w-full items-center justify-center rounded-full bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent dark:text-white dark:hover:border-transparent">
                      <span>Login with Metamask</span>
                    </button>
                  } */}
                       {!realAddress &&
                    <ConnectWallet />
                  }
                  {/* <WalletButton /> */}
                    {
                      account &&
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
                        contract.call("balanceOfBatch", [realAddress, realAddress, realAddress, realAddress], [0,1,2,3])
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