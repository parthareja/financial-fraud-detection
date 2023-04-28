import React from 'react'
import { FcMoneyTransfer } from "react-icons/fc";
function SideBar(user) {
    return (
        <div className="flex flex-col bg-neutral-900  w-60 text-white">
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcMoneyTransfer fontSize={26} />
                <span className='text-neutral-100 text-lg'>Fraud Detection</span>
            </div>
            <div className='text-left'>
                bruh why 
            </div>
        
            {/* <div class="flex-1">top part</div> */}
            {/* <div>bottom part</div> */}
        </div>

    )
}

export default SideBar