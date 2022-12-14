import React, { useState, useEffect } from "react";
import { getSession, signOut } from 'next-auth/react';

import { Web3Button } from "@thirdweb-dev/react";

const Metamask_comp_login = () => {
	const address = "0xcD47238F19042A521831850d4522D65f83adb3Ba";
	const abi = [{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
		return (
			<Web3Button
				contractAddress="0x0469F8Ca65Ce318888cc0d6459d0c7cbe5912c98"
				contractAbi={abi}
				action={(contract) =>
					contract.call("balanceOf", address)
				}
				onSuccess={(res)=>{
					console.log(parseInt(res))
				}}
				onError={(res)=>{
					console.log(res)
				}}
				onSubmit={(res)=>{
					console.log("Calling balanceOf")
				}}
				>
				Get Balance
			</Web3Button>
		);
};

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    return {
        props: { account: session.user },
    };
}



export { Metamask_comp_login };
