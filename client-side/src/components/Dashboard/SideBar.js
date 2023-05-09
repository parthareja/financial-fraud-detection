import { React, useContext, useEffect, useState } from 'react'
import { FcMoneyTransfer } from "react-icons/fc";
import { BsFillPersonFill, BsCashStack  } from "react-icons/bs";
import {BiTransfer} from "react-icons/bi"
import { HiOutlineLogout } from "react-icons/hi"
import Button from 'react-bootstrap/esm/Button';

// import {  } from "react";
import { TestContext } from "../../contexts/TestContext";

function SideBar( props ) {

    const queries = props.queries;
    const setQueries = props.setQueries;

    // const userTransactions = [
    //     {
    //         "_id": "6456972325695fd202e492b2",
    //         "user_id": "6436b3ce923ccbc912aa18e9",
    //         "alias": "jfkla;jfklsjf;slkdjfklsdjfa;lskdfjs;lkfj; overflow is expanding the sidebar(to be fixed)",
    //         "step": 0,
    //         "amount": 11,
    //         "oldbalanceOrg": 100,
    //         "oldbalanceDest": 90,
    //         "origBalance_inacc": -1,
    //         "destBalance_inacc": 1,
    //         "type_CASH_OUT": 1,
    //         "type_TRANSFER": 0,
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6456a6e474b67988a62b6241",
    //         "user_id": "6436b3ce923ccbc912aa18e9",
    //         "alias": "parseint",
    //         "step": 0,
    //         "amount": 11,
    //         "oldbalanceOrg": 100,
    //         "oldbalanceDest": 90,
    //         "origBalance_inacc": -1,
    //         "destBalance_inacc": 2,
    //         "type_CASH_OUT": 1,
    //         "type_TRANSFER": 0,
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64574cced01f5ded4623a878",
    //         "user_id": "6436b3ce923ccbc912aa18e9",
    //         "alias": "sussy?",
    //         "step": 18,
    //         "amount": 0,
    //         "oldbalanceOrg": 0,
    //         "oldbalanceDest": 0,
    //         "origBalance_inacc": 0,
    //         "destBalance_inacc": 0,
    //         "type_CASH_OUT": 0,
    //         "type_TRANSFER": 1,
    //         "__v": 0
    //     },
    //     {
    //         "_id": "64574d2cd01f5ded4623a87a",
    //         "user_id": "6436b3ce923ccbc912aa18e9",
    //         "alias": "234",
    //         "step": 1,
    //         "amount": 234,
    //         "oldbalanceOrg": 234,
    //         "oldbalanceDest": 234,
    //         "origBalance_inacc": -234,
    //         "destBalance_inacc": 234,
    //         "type_CASH_OUT": 0,
    //         "type_TRANSFER": 1,
    //         "__v": 0
    //     },
    //     {
    //         "_id": "645765426e8ef7bf03e88eb9",
    //         "user_id": "6436b3ce923ccbc912aa18e9",
    //         "alias": "234",
    //         "step": 1,
    //         "amount": 234,
    //         "oldbalanceOrg": 234,
    //         "oldbalanceDest": 234,
    //         "origBalance_inacc": -234,
    //         "destBalance_inacc": 234,
    //         "type_CASH_OUT": 0,
    //         "type_TRANSFER": 1,
    //         "__v": 0
    //     },
    //     {
    //         "_id": "6456972325695fd202e492b2",
    //         "user_id": "6436b3ce923ccbc912aa18e9",
    //         "alias": "hehehehehahahahh",
    //         "step": 0,
    //         "amount": 11,
    //         "oldbalanceOrg": 100,
    //         "oldbalanceDest": 90,
    //         "origBalance_inacc": -1,
    //         "destBalance_inacc": 1,
    //         "type_CASH_OUT": 1,
    //         "type_TRANSFER": 0,
    //         "__v": 0
    //     },

    // ]

    // const { user, setUser } = useContext(TestContext);
    const UserContext = useContext(TestContext)
    const sidebarItemsClasses = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'
    const [allUserTransactions, setAllUserTransaction] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/auth/userTransactions/${UserContext.user._id}`)
        .then((res)=>res.json())
        .then((data)=>{setAllUserTransaction(data);console.log(data)})
        .catch((err)=>console.log(err))
    },[queries]);
    

    return (
        <div className="flex flex-col bg-neutral-900  w-80 text-white">
            <div className='flex items-center gap-2 px-2 py-3'>
                <FcMoneyTransfer fontSize={26} />
                <span className='text-neutral-100 text-lg'>Fraud Detection</span>
            </div>

            <div className = 'flex px-4 py-3 gap-0.5 pt-1 border-b border-neutral-700'>
                <span> Your Transactions :</span>
            </div>

            <div className='flex-1 flex flex-col text-left pt-2 px-3 gap-0.5 text-neutral-400 overflow-auto'>
                {allUserTransactions.map((item) => (
                    <SideBarItems  item={item}/>
                    // <div onClick={handleClick(item)} key={item._id}>
                    //     {item.alias}
                    //     {item.amount}
                    // </div>
                ))}
            </div>


            <div className=' gap-0.5 pt-2 border-t border-neutral-700'>
                <div className='flex items-center gap-2 px-3 py-2 text-neutral-400'>
                    <BsFillPersonFill fontSize={20} />
                    <span> {UserContext.user.firstName} {UserContext.user.lastName}</span>
                </div>
                <div onClick={props.handleLogout} className='flex  text-red-500 items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer' >
                    <HiOutlineLogout />
                    <span>Logout</span>
                </div>
            </div>
            {/* <div class="flex-1">top part</div> */}
            {/* <div>bottom part</div> */}
        </div>
    )
}

function SideBarItems({ item }) {
    if (item.type_CASH_OUT === 1) {
        return (
            <div onClick={()=>handleClick(item)} className='flex items-center gap-3 font-light px-1 py-1 hover:bg-neutral-700 hover:no-underline hover:text-white active:bg-neutral-600 rounded-md text-base cursor-pointer'>
                <span className='text-xl'><BsCashStack/></span>
                {item.alias}
            </div>
    )}
    else{
        return (
            <div onClick={()=>handleClick(item)} className='flex items-center gap-3 font-light px-1 py-1 hover:bg-neutral-700 hover:no-underline hover:text-white active:bg-neutral-600 rounded-md text-base cursor-pointer'>
                <span className='text-xl'><BiTransfer/></span>
                {item.alias}
            </div>
    )
    }
}

const handleClick = (item) =>{
    console.log(item)
}
// qid, amount, orig bal, expandable card, id feild

export default SideBar