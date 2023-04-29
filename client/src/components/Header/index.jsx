import React from "react";
import Logo from "@/assets/Logo.png";

const Header = () => {
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

                <button className="bg-blue-900 py-2 px-3 text-[15px] rounded">Connect Wallet</button>
            </div>
        </div>
    )
}

export default Header