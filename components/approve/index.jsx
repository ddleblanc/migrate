import React, { useState, useEffect } from "react";
import { getSession, signOut } from 'next-auth/react';

import { useContract, useContractWrite } from "@thirdweb-dev/react";

const Approve = (props) => {
    console.log(props)
    const { contract } = useContract("0x0469F8Ca65Ce318888cc0d6459d0c7cbe5912c98");
    const {
    mutate: approve,
    isLoading,
    error,
    } = useContractWrite(contract, "approve");

    const approveMigration = () => {
        approve(["0x061251CE89D67115c68bbA086a7ec77323078217", props.balance])
    }

	
		return (
		<>
            <button onClick={approveMigration} className="dark:bg-jacarta-800  dark:hover:bg-jacarta-700 hover:bg-jacarta-50 text-jacarta-700 mb-4 flex w-full items-center justify-center rounded-full bg-white py-4 px-8 text-center font-semibold transition-all hover:border-transparent dark:text-white dark:hover:border-transparent">
                <img
                src="/images/wallets/torus_24.svg"
                className="mr-2.5 inline-block h-6 w-6"
                alt=""
                />
                <span>TEST</span>
            </button>
        </>
		);
};

export { Approve };
