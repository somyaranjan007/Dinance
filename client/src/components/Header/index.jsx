import React, { useState } from "react";
import Logo from "@/assets/Logo.png";
import { appDataState } from "@/context";
import { useContext } from "react";

const Header = () => {

  const {metaMaskAccount,setMetaMaskAccount,connectWallet}= useContext(appDataState)

  const disConnectWallet = () => {
    setMetaMaskAccount("");
  }


  // console.log(metaMaskAccount);

  return (
    <div className="flex items-center justify-between px-2 h-[70px] pr-4 bg-[#21232f] text-white">
      <div className="flex items-center">
        <img src={Logo.src} alt="" className="w-[50px]" />
        <h1 className="text-[35px]">Dinance</h1>
      </div>
      <div className="flex items-center">
        <ul className="flex items-center h-full mx-5">
          <li className="px-3 text-[16px]">Dashboard</li>
          <li className="px-3 text-[16px]">Markets</li>
          <li className="px-3 text-[16px]">Stake</li>
          <li className="px-3 text-[16px]">Governance</li>
          <li className="px-3 text-[16px]">More</li>
        </ul>

        {
          metaMaskAccount ? 
          <button 
            onClick={disConnectWallet}
            className="bg-blue-900 py-2 px-3 text-[15px] rounded"
          >
            {`${metaMaskAccount.slice(0, -37)}...${metaMaskAccount.slice(metaMaskAccount.length-3, metaMaskAccount.length)}`}
          </button>
          :
          <button
          onClick={connectWallet}
          className="bg-blue-900 py-2 px-3 text-[15px] rounded"
          >
            Connect Wallet
          </button>
        } 
      </div>
    </div>
  );
};

export default Header;
