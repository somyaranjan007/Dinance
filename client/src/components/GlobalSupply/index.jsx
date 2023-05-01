import React from 'react'
import { assetsToDeposit,assetsToBorrow } from './depositBorrowAssets'

const GlobalSupply = () => {
  return (
    <div className='flex w-full my-8 gap-8 justify-center'>
        {/* assets to supply */}
        <div className='flex flex-col gap-4 border-2 p-6 border-slate-300 w-[500px] rounded-lg shadow-md '>
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
              {assetsToDeposit.map((market,i)=>(
                <div className='flex gap-[110px] items-center'>
                  <div className='flex w-[80px] gap-2 items-center justify-start'>
                    <img className='w-[30px]' src={market.url} alt={`token-img-${i}`}/>
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

        {/* assets to borrow */}
        <div className='flex flex-col gap-4 border-2 p-6 border-slate-300 w-[500px] rounded-lg shadow-md '>
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
              {assetsToBorrow.map((market,i)=>(
                <div className='flex gap-[110px] items-center'>
                  <div className='flex w-[80px] gap-2 items-center justify-start'>
                    <img className='w-[30px]' src={market.url} alt={`token-img-${i}`}/>
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