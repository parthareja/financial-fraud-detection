import {React, useContext} from 'react'
import { FcMoneyTransfer } from "react-icons/fc";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineLogout} from "react-icons/hi"
import Button from 'react-bootstrap/esm/Button';

// import {  } from "react";
import { TestContext } from "../../contexts/TestContext";

function SideBar({handleLogout}) {
    const { user, setUser } = useContext(TestContext);
    const sidebarItemsClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
    return (
        <div className="flex flex-col bg-neutral-900  w-60 text-white">
            <div className='flex items-center gap-2 px-1 py-3'>
                <FcMoneyTransfer fontSize={26} />
                <span className='text-neutral-100 text-lg'>Fraud Detection</span>
            </div>

            <div className='flex-1 py-8 flex flex-col gap-0.5 text-neutral-400'>
            </div>


            <div className=' gap-0.5 pt-2 border-t border-neutral-700'>
                <div className = 'flex items-center gap-2 px-3 py-2 text-neutral-400'>
                    <BsFillPersonFill fontSize = {20}/>
                    <span> {user.firstName} {user.lastName}</span>
                </div>
                <div onClick={handleLogout} className='flex  text-red-500 items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base' >
                    <HiOutlineLogout/>
                    <span>Logout</span>
                </div>
            </div>
            {/* <div class="flex-1">top part</div> */}
            {/* <div>bottom part</div> */}
        </div>
    )
}

// function SideBarItems({item}){
//     return(
//         <Link>

//         </Link>
//     )
// }

// qid, amount, orig bal, expandable card, id feild

export default SideBar