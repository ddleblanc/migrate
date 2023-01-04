import React, { useState } from "react";
import Link from "next/link";
import Confetti from "../components/confetti";
import { useDisconnect, ConnectWallet, useAddress } from "@thirdweb-dev/react";
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import { Web3Button } from "@thirdweb-dev/react";
import { migrationContract, abi, approvalContract, approvalAbi} from "../components/contracts";
import { useTheme } from "next-themes";
import { LoadingOverlay, CopyButton, Button, Tooltip, ActionIcon } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons';


export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [balance, setBalance] = useState();
  const [balanceHex, setBalanceHex] = useState();
  const [isApproved, setIsApproved] = useState(false);
  const [isMigrated, setIsMigrated] = useState(false)
  const [tierOfReward, setTierOfReward] = useState()

  // const [isVisible, setIsVisible] = useState(true);
  // const [tierOfReward, setTierOfReward] = useState(1)
  // const [isMigrated, setIsMigrated] = useState(true)
  // const [isApproved, setIsApproved] = useState(true);
  // const [balance, setBalance] = useState(1);


  const [balanceMsg, setBalanceMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const disconnect = useDisconnect();
  const { theme, setTheme } = useTheme();
  (function(){
    setTheme("dark");
})();

  const disconnectWallet = async () => {
    disconnect()
    setIsApproved(false)
    setIsMigrated(false)
    setTierOfReward(null)
    setIsVisible(false)
    setBalance(null)
  }

  const realAddress = useAddress();
  
  return (
    <div>
     <section className="relative h-screen">
        <div className="lg:flex h-full">
          {/* <!-- Left --> */}
          <div className="relative text-center lg:w-1/2 h-1/2 lg:h-[100%]">
          {!tierOfReward && 
            <img
              src="/images/login.webp"
              alt="login"
              className="absolute h-full w-full object-cover"
            />
          }
            {tierOfReward && 
            isVisible && 
            <>
            <Confetti />
            <ReactPlayer src={`videos/${tierOfReward}.mp4`} url={`videos/${tierOfReward}.mp4`} autoplay={true} playing loop muted width="100%" height="100%"/>
            </>
            }
           
            {/* <!-- Logo --> */}
            {!tierOfReward && 
              <Link href="/">
              <a className="relative inline-block py-36">
                <img
                  src="/images/logo_white.png"
                  className="inline-block max-h-7"
                  alt="hyperchainx | NFT Marketplace"
                />
              </a>
            </Link>
            }
           
          </div>

          {/* <!-- Right --> */}
          <div className="relative flex items-center justify-center p-[10%] lg:w-1/2 h-1/2 lg:h-[100%]">
          <LoadingOverlay 
      loaderProps={{ color: '#aaff26' }}
      overlayOpacity={0.3}
      overlayColor="#000000" 
      visible={isLoading} 
      overlayBlur={2}  
      />
            <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
              <img
                src="/images/gradient_light.jpg"
                alt="gradient"
                className="h-full w-full"
              />
            </picture>

            <div className="w-full max-w-[25.625rem] text-center">
            {!isMigrated &&
              <h1 className="text-jacarta-700 font-display mb-4 text-4xl dark:text-white">
                Migration
              </h1>
            }
            {isMigrated &&
              <h1 className="text-jacarta-700 font-display mb-4 text-4xl dark:text-white">
                Add to Wallet
              </h1>
            }
             
            {!tierOfReward &&
              <p className="dark:text-jacarta-300 mb-8 text-lg leading-normal">
                <a href="https://t.me/hyperchainx" className="text-sm">
                  Need support?
                </a>
              </p>
            }
            
              <div>
                  {balance && 
                  !tierOfReward &&
                  !isMigrated &&
                    <button className="dark:bg-jacarta-900 dark:border-jacarta-600 border-jacarta-100 dark:hover:bg-jacarta-700 hover:bg-accent text-jacarta-700 mb-16 flex w-full items-center justify-center rounded-full border-2 bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent hover:text-white dark:text-white">
                     
              <img
              src="/images/logo.png"
              className="mr-2.5 inline-block h-6 w-6 object-contain"
              alt=""
              />
                     
                      <span>{balance}</span>
                    </button>
                  }            
                       {!realAddress &&
                    <ConnectWallet />
                  }
                    {
                      realAddress &&
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
                        setIsLoading(false)
                        if(parseInt(res) > 0) {
                          let num = parseInt(res);
                          let numString = num.toString();
                          let transformedNum = numString.slice(0, -7) + "." + numString.slice(-7);
                          setBalance(transformedNum)
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
                        setIsLoading(true)
                        console.log("Calling balanceOf")
                      }}
                      >
                      {balanceMsg ? balanceMsg : "Step 1: Get Balance"}
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
                          setIsLoading(false)
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
                        setIsLoading(true)
                        console.log("address")
                      }}
                      >
                      Step 2: Approve
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
                          setIsApproved(false)
                        }).then((res)=> {
                          setIsLoading(false)
                          console.log(res)
                          if(res.receipt.status !== 1) return
 
                          setIsMigrated(true)
                          setBalance("Migration Succesful")

                          console.log("migration successful")
                          // console.log(res.receipt.status)
                        })
                      }
                      }
                      onSuccess={(res)=>{
                        console.log("migration onSuccess fired")
                      }}
                      onError={(res)=>{
                        console.log(res)
                      }}
                      onSubmit={()=>{
                        setIsLoading(true)
                        console.log("address")
                      }}
                      >
                      Step 3: Migrate
                    </Web3Button>
                    {isVisible && <Confetti />}
                    </>
                    }
                    {isMigrated &&
                      isApproved &&
                    !tierOfReward &&
                    <>
                    <p className="mb-10 normal-case">Add this address to your wallet to see your new $HYPER tokens: <br /> <br />
                    <CopyButton value="0xee5b03b769ca6c690d140cafb52fc8de3f38fc28" color="dark">
                    {({ copied, copy }) => (
                      <Button color={copied ? 'dark' : 'dark'} onClick={copy}>
                        {copied ? 'Copied' : '0xee5b..fc28'} 
                          <span className="ml-2">
                          {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                          </span>
                      </Button>
                    )}
                  </CopyButton>
                    </p>
 
                    <Web3Button
                      contractAddress={"0x184e09df5be5d3f26c8595dc523b6cf79cc1d7fc"}
                      action={(contract) =>
                        contract.call("balanceOfBatch", [realAddress, realAddress, realAddress, realAddress], [0,1,2,3])
                      }
                      onSuccess={(res)=> {
                        setIsLoading(false)
                        console.log(res)
                        setIsVisible(true)
                        for(let i = 0; i < res.length; i++){
                          if(parseInt(res[i])  > 0) {
                            setTierOfReward(i)
                          }
                        }
                        console.log({tier: tierOfReward})     
                      }}
                      onError={(res)=>{
                        console.log(res)
                      }}
                      onSubmit={(res)=>{
                        setIsLoading(true)
                        console.log("Calling balanceOf")
                      }}
                      >
                      {tierOfReward ? `Tier: ${tierOfReward}` : "Claim Your NFT"}
                    </Web3Button>
                    </>
                    }
                    { tierOfReward &&
                    <>
                    <p className="normal-case">Paste the address and the id into the NFT section of your metamask or trustwallet to see your OG HOLDER NFT in your wallet</p>
                    <br />

                    {/* <button className="dark:bg-jacarta-900 dark:border-jacarta-600 border-jacarta-100 dark:hover:bg-jacarta-700 hover:bg-accent text-jacarta-700 mb-16 flex w-full items-center justify-center rounded-full border-2 bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent hover:text-white dark:text-white">
                      <span className="mr-2">0x184e09df5be5d3f26c8595dc523b6cf79cc1d7fc</span>
                      <span>copy</span>
                    </button> */}
                    <CopyButton value="0x184e09df5be5d3f26c8595dc523b6cf79cc1d7fc" color="dark">
                    {({ copied, copy }) => (
                      <Button color={copied ? 'dark' : 'dark'} onClick={copy}>
                        {copied ? 'Address Copied' : 'Reward Address'} 
                          <span className="ml-2">
                          {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                          </span>
                      </Button>
                    )}
                  </CopyButton>
                    <br/>
                    <CopyButton value={tierOfReward} color="dark">
                    {({ copied, copy }) => (
                      <Button color={copied ? 'dark' : 'dark'} onClick={copy}>
                        {copied ? 'ID Copied' : 'Reward ID'} 
                          <span className="ml-2">
                          {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                          </span>
                      </Button>
                    )}
                  </CopyButton>
            
                    </>
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