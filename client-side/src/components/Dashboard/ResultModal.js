import React, { useEffect, useState } from "react";
// import { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const ResultModal = (props) => {
  // const [reRender, setReRender] = useState(false);
  var queryDataWithResult = props.queryData;
  queryDataWithResult["ml_classification"] = props.result;

  useEffect(() => {
    queryDataWithResult = props.queryData;
  }, [props.queryData]);

  const [resultText, setResultText] = useState("default");

  // Text display logic
  var bodyText = "default";
  var textColour = "green";

  // Time display logic

  var displayTime = 0;

  const handleTimeStep = () => {
    var step = props.queryData.step - 1;
    let strtime;
    console.log;
    if (step == 12) {
      strtime = step + ":00 PM";
    } else if (step == 0) {
      strtime = "12:00 AM";
    } else if (step < 12) {
      strtime = step + ":00 AM";
    } else {
      step = step - 12;
      strtime = step + ":00 PM";
    }
    displayTime = strtime;
  };
  handleTimeStep();

  // Type of Transfer display logic
  var showCashOut = true;
  var showTransfer = false;

  const handleTransactionType = () => {
    if (props.queryData.type_TRANSFER) {
      showTransfer = true;
      showCashOut = false;
    } else {
      showCashOut = true;
      showTransfer = false;
    }
  };
  // console.log(showCashOut, showTransfer);
  handleTransactionType();

  if (props.result == "false") {
    bodyText = "This transaction is genuine";
  } else {
    // console.log("result to declare FRAUDULENT", props.result);
    bodyText = "This transaction is FRAUDULENT";
    textColour = "red";
  }

  // Classification display logic

  // const handleClassificationText = (bool) => {
  //   if (bool) {
  //     return "Fraudulent";
  //   } else {
  //     return "Genuine";
  //   }
  // };
  // const handleClassificationColour = (bool) => {
  //   if (bool) {
  //     return "RGBA(250, 160, 160, 0.65)";
  //   } else {
  //     return "RGBA(213, 255, 221, 1)";
  //   }
  // };

  // Save Query logic

  const handleSave = async () => {
    console.log("saving");
    console.log(props.queryData);
    console.log(queryDataWithResult);
    await fetch("http://localhost:8080/auth/saveQuery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queryDataWithResult),
      credentials: "include",
    })
      .then((data) => {
        console.log(data);
        // console.log(props);
        props.onHide();
        props.setQueriesUpdate(!props.queriesUpdate);
      })
      .catch((err) => console.log(err.message));

    // POST_ml_query(ml_datajson_array);

    // console.log(queries);

    // clearForm();
  };

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
            Analysis{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ color: textColour, textAlign: "center" }}>{bodyText}</h4>
          <br />
          <div>
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
                  {/* <tr>
                    <td>Alias</td>
                    <td>{props.queryData.alias}</td>
                  </tr> */}
                  <tr>
                    <td>Amount</td>
                    <td>{props.queryData.amount}</td>
                  </tr>
                  <tr>
                    <td>Old Origin Balance</td>
                    <td>{props.queryData.oldbalanceOrg}</td>
                  </tr>
                  <tr>
                    <td>New Origin Balance</td>
                    <td>{props.queryData.newbalanceOrg}</td>
                  </tr>
                  <tr>
                    <td>Old Destination Balance</td>
                    <td>{props.queryData.oldbalanceDest}</td>
                  </tr>
                  <tr>
                    <td>New Destination Balance</td>
                    <td>{props.queryData.newbalanceOrg}</td>
                  </tr>
                  {showCashOut && (
                    <tr>
                      <td>Transaction Type</td>
                      <td>Cash-out</td>
                    </tr>
                  )}
                  {showTransfer && (
                    <tr>
                      <td>Transaction Type</td>
                      <td>Transfer</td>
                    </tr>
                  )}
                  <tr>
                    <td>Time Of Transaction</td>
                    <td>{displayTime}</td>
                  </tr>
                  {/* <tr>
                    <td>Transaction classified as</td>
                    <td
                      style={{
                        backgroundColor: handleClassificationColour(props.result),
                      }}
                    >
                      {handleClassificationText(props.result)}
                    </td>
                  </tr> */}
                </tbody>
              </Table>
            </div>
            <br />
            <div className="d-flex flex-column container justify-center">
              {/* <label className="p-1 text-center" for="aliasName">
                Alias
              </label> */}
              <input
                className="form-control"
                type="text"
                id="aliasName"
                placeholder="Enter an alias for this query (ex: JHN-09-02-03)"
                onChange={(e) => {
                  queryDataWithResult["alias"] = e.target.value;
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResultModal;
