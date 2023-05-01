import React, {} from "react";
import Logo from "@/assets/Logo.png";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

const Header = () => {
<<<<<<< HEAD
  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();
=======
    return (
        <div className="flex bg-[#1f212d] text-white  items-center justify-between px-2 h-[70px] pr-4">
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
>>>>>>> global_supply

      if (provider) {
        const account = await provider.request({
          method: "eth_requestAccounts",
        });
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = ethersProvider.getSigner();
      } else {
        alert("Please install metamask wallet!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-between px-2 h-[70px] pr-4">
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

        <button
          onClick={connectWallet}
          className="bg-blue-900 py-2 px-3 text-[15px] rounded"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Header;
