import React from "react";
import { IoWalletOutline } from "react-icons/io5";
import { BiDollar } from "react-icons/bi";
import { TbAntennaBars5 } from "react-icons/tb"

const Content = () => {

    return (
        <div className="bg-[#10111c] text-white h-[250px] px-28 flex justify-center items-start flex-col">
            <h1 className="text-[45px] font-semibold">Ethereum Market</h1>
            <div className="py-3 flex items-center justify-start">
                <div className="flex items-center">
                    <div className="border w-fit p-2 border-gray-500 rounded-lg flex items-center justify-center">
                        <IoWalletOutline className="text-[25px] text-gray-400" />
                    </div>
                    <div className="flex flex-col items-start pl-2">
                        <span className="text-[15px] text-gray-400 pl-1">Net worth</span>
                        <div className="flex items-center justify-start">
                            <BiDollar className="text-[20px]" />
                            <h2 className="text-[20px]">0</h2>
                        </div>
                    </div>
                </div>

                <div className="flex items-center pl-10">
                    <div className="border w-fit p-2 border-gray-500 rounded-lg flex items-center justify-center">
                        <TbAntennaBars5 className="text-[25px] text-gray-400" />
                    </div>
                    <div className="flex flex-col items-start pl-2">
                        <span className="text-[15px] text-gray-400 pl-1">Net APY</span>
                        <div className="flex items-center justify-start">
                            <BiDollar className="text-[20px]" />
                            <h2 className="text-[20px]">0</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content