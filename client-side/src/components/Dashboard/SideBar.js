import { React, useContext, useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { BsFillPersonFill, BsCashStack } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { Dialog } from "@headlessui/react";
import axios from "axios";
// import Modal from 'react-modal';

import "./SideBar.css";

import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

import "./SideBar.css";

// import {  } from "react";
import { TestContext } from "../../contexts/TestContext";

function SideBar(props) {
  const queries = props.queriesUpdate;
  // console.log(queries);
  const setQueries = props.setQueriesUpdate;

  // const { user, setUser } = useContext(TestContext);

  const UserContext = useContext(TestContext);
  const sidebarItemsClasses =
    "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";
  const [allUserTransactions, setAllUserTransaction] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:8080/auth/userTransactions/${UserContext.user._id}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((data) => {
        data.map((item) => {
          if (item.type_CASH_OUT == 1) {
            item.type_CASH_OUT = true;
            item.type_TRANSFER = false;
          } else {
            item.type_TRANSFER = true;
            item.type_CASH_OUT = false;
          }
        });
        setAllUserTransaction(data);
        console.log(allUserTransactions);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, [queries]);

  return (
    <div className="flex flex-col bg-neutral-900  w-80 text-white">
      <div className="flex items-center gap-2 px-2 py-3">
        <FcMoneyTransfer fontSize={26} />
        <span className="text-neutral-100 text-lg">Fraud Detection</span>
      </div>

      <div className="flex px-4 py-3 gap-0.5 pt-1 border-b border-neutral-700">
        <span>Your Transactions:</span>
      </div>

      <div className="flex-1 flex flex-col text-left pt-2 px-3 gap-0.5 text-neutral-400 overflow-auto">
        <UserTransactionModal
          time={time}
          setTime={setTime}
          data={modalData}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        {allUserTransactions.map((item) => (
          <div>
            <SideBarItems
              key={item._id}
              item={item}
              setModalShow={setModalShow}
              setModalData={setModalData}
            />
          </div>
          // <div onClick={handleClick(item)} key={item._id}>
          //     {item.alias}
          //     {item.amount}
          // </div>
        ))}
      </div>

      <div className=" gap-0.5 pt-2 border-t border-neutral-700">
        <div className="flex items-center gap-2 px-3 py-2 text-neutral-400">
          <BsFillPersonFill fontSize={20} />
          <span>
            {" "}
            {UserContext.user.firstName} {UserContext.user.lastName}
          </span>
        </div>
        <div
          onClick={props.handleLogout}
          className="flex  text-red-500 items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base cursor-pointer"
        >
          <HiOutlineLogout />
          <span>Logout</span>
        </div>
      </div>
      {/* <div class="flex-1">top part</div> */}
      {/* <div>bottom part</div> */}
    </div>
  );
}

function SideBarItems({ item, setModalShow, setModalData }) {
  const handleClick = (item) => {
    console.log(item);
    setModalData(item);
    setModalShow(true);
  };
  if (item.type_CASH_OUT === true) {
    // item.type_CASH_OUT = true;
    // item.type_TRANSFER = false;
    return (
      <div
        onClick={() => handleClick(item)}
        className="flex items-center gap-3 font-light px-1 py-1 hover:bg-neutral-700 hover:no-underline hover:text-white active:bg-neutral-600 rounded-md text-base cursor-pointer"
      >
        <span className="text-xl">
          <BsCashStack />
        </span>
        {item.alias}
      </div>
    );
  } else {
    // item.type_TRANSFER = true;
    // item.type_CASH_OUT = false;
    return (
      <div
        onClick={() => handleClick(item)}
        className="flex items-center gap-3 font-light px-1 py-1 hover:bg-neutral-700 hover:no-underline hover:text-white active:bg-neutral-600 rounded-md text-base cursor-pointer"
      >
        <span className="text-xl">
          <BiTransfer />
        </span>
        {item.alias}
      </div>
    );
  }
}

// qid, amount, orig bal, expandable card, id feild

function UserTransactionModal(props) {
  const handleTimeStep = () => {
    var step = props.data.step - 1;
    let strtime;
    console.log;
    if (step == 12) {
      strtime = step + ":00 PM";
    }
    // else if(step < 10){
    //     time = "0"+step+":00 AM"
    // }
    else if (step == 0) {
      strtime = "12:00 AM";
    } else if (step < 12) {
      strtime = step + ":00 AM";
    } else {
      step = step - 12;
      strtime = step + ":00 PM";
    }
    props.setTime(strtime);
  };
  handleTimeStep();
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {/* <span>Transaction details for: </span> */}
            {props.data.alias}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal {props.data._id}</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p> */}
          <div className="flex container justify-center ">
            <Table striped bordered hover>
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th>Property</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alias</td>
                  <td>{props.data.alias}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{props.data.amount}</td>
                </tr>
                <tr>
                  <td>Old Origin Balance</td>
                  <td>{props.data.oldbalanceOrg}</td>
                </tr>
                <tr>
                  <td>New Origin Balance</td>
                  <td>{props.data.newbalanceOrg}</td>
                </tr>
                <tr>
                  <td>Old Destination Balance</td>
                  <td>{props.data.oldbalanceDest}</td>
                </tr>
                <tr>
                  <td>New Destination Balance</td>
                  <td>{props.data.newbalanceOrg}</td>
                </tr>
                {props.data.type_CASH_OUT && (
                  <tr>
                    <td>Transaction Type</td>
                    <td>Cash-out</td>
                  </tr>
                )}
                {props.data.type_TRANSFER && (
                  <tr>
                    <td>Transaction Type</td>
                    <td>Transfer</td>
                  </tr>
                )}
                <tr>
                  <td>Time Of Transaction</td>
                  <td>{props.time}</td>
                </tr>
                <tr>
                  <td>Transaction classified as</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="danger">Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SideBar;
