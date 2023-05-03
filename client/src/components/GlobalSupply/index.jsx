import React, { useContext, useState } from 'react'
import { assetsToDeposit, assetsToBorrow } from './depositBorrowAssets'
import { appDataState } from '@/context'
import {RxCross2} from "react-icons/Rx"
import {DinancePoolABI} from "@/utils/constant.js"
import { ethers } from 'ethers'

const GlobalSupply = () => {
  const {amount,setAmount}= useContext(appDataState)
  const {factoryContract,signerr}= useContext(appDataState)
  const [tokenAddress, setTokenAddress]=useState(null)

  const [show,setShow]=useState(false)
  console.log(amount)


  const handleDeposit= async(_tokenAddress,_amount)=>{
  const poolAddress= await factoryContract.DinancePoolAddress(_tokenAddress)
  console.log(poolAddress)
  const DinancePoolContract = new ethers.Contract(_tokenAddress, DinancePoolABI, signerr);

  const tx=await DinancePoolContract.deposit(_tokenAddress,_amount,{gasLimit:100000})
  await tx.wait()
  }

  return (
    <div className='flex w-full justify-between px-[105px] py-4 relative'>
      {/* a pop up to take amount from user */}
      {show && (
        <div className='flex flex-col p-4 shadow-xl shadow-gray-400 border-gray-300 gap-4 justify-center items-center w-[320px] h-[180px] rounded absolute left-1/2 bg-white'>
          <RxCross2 className="absolute top-2 right-2 text-red-700 cursor-pointer" onClick={()=>setShow(false)}/>
          <input className='p-2 w-full border rounded' type="number" step="0.00001" placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
          <button className=' text-gray-200 px-3 py-1 border rounded bg-blue-900'
          onClick={()=>handleDeposit(tokenAddress,ethers.utils.parseEther(amount))}>Submit</button>
      </div>
      )}
      {/* assets to supply */}
      <div className='flex flex-col gap-4 p-6 mx-2 w-full rounded shadow-md bg-white'>
        {/* row1 */}
        <div>
          <h1 className='text-[#10111c] font-bold text-2xl  tracking-wide'>Assets to Deposit</h1>
        </div>
        {/* row2 */}
        <div className="px-1 flex text-md font-semibold tracking-wide gap-[8.4rem] text-gray-400 ">
          <h1>Assets</h1>
          <h1>APY</h1>
        </div>
        {/* row3 */}
        <div className='flex flex-col gap-8 font-semibold '>
          {/* market1 */}
          {assetsToDeposit.map((market, i) => (
            <div className='flex gap-[110px] items-center'>
              <div className='flex w-[80px] gap-2 items-center justify-start'>
                <img className='w-[30px]' src={market.url} alt={`token-img-${i}`} />
                <h1>{market.name}</h1>
              </div>
              <div>
                <h1>{market.APY}</h1>
              </div>
              <div>
                <button className='bg-gray-300 px-3 font-semibold text-gray-400 py-2 rounded-md text-sm'
                onClick={()=>{
                  setShow(true)
                  setTokenAddress(market.tokenAddress)}}>{market.action}</button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* assets to borrow */}
      <div className='flex flex-col gap-4 p-6 mx-2 w-full rounded shadow-md bg-white'>
        {/* row1 */}
        <div>
          <h1 className='text-[#10111c] font-bold text-2xl  tracking-wide'>Assets to Borrow</h1>
        </div>
        {/* row2 */}
        <div className="px-1 flex text-md font-semibold tracking-wide gap-[8.4rem] text-gray-400 ">
          <h1>Assets</h1>
          <h1>APY</h1>
        </div>
        {/* row3 */}
        <div className='flex flex-col gap-8 font-semibold '>
          {/* market1 */}
          {assetsToBorrow.map((market, i) => (
            <div className='flex gap-[110px] items-center'>
              <div className='flex w-[80px] gap-2 items-center justify-start'>
                <img className='w-[30px]' src={market.url} alt={`token-img-${i}`} />
                <h1>{market.name}</h1>
              </div>
              <div>
                <h1>{market.APY}</h1>
              </div>
              <div>
                <button className='bg-gray-300 px-3 font-semibold text-gray-400 py-2 rounded-md text-sm'>{market.action}</button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default GlobalSupply