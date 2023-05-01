import React from 'react'

const UserSupply = () => {
    return (
        <div className="flex items-center justify-center px-[105px] text-black py-4">
            <div className="w-full bg-white mx-2 h-[120px] rounded p-3 flex flex-col justify-between items-start">
                <h3 className="text-[20px] font-semibold text-gray-800">Your supplies</h3>
                <span className="text-[16px] text-gray-700">Nothing supplied yet</span>
            </div>
            <div className="w-full bg-white mx-2 h-[120px] rounded p-3 flex flex-col justify-between items-start">
                <h3 className="text-[20px] font-semibold text-gray-800">Your borrows</h3>
                <span className="text-[16px] text-gray-700">Nothing borrowed yet</span>
            </div>
        </div>
    )
}

export default UserSupply