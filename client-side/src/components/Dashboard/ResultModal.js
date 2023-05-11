import React, { useEffect, useState } from "react";
// import { useEffect } from "react";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

const ResultModal = (props) => {
  // const [reRender, setReRender] = useState(false);
  var queryDataWithResult = props.queryData;

  useEffect(() => {
    queryDataWithResult = props.queryData;
    queryDataWithResult["ml_classification"] = props.result;
  }, [props.queryData]);
  const [resultText, setResultText] = useState("default");

  // Text display logic
  var bodyText = "default";
  var textColour = "green";

  if (props.result == "false") {
    bodyText = "This transaction is genuine";
  } else {
    console.log("result to declare FRAUDULENT", props.result);
    bodyText = "This transaction is FRAUDULENT";
    textColour = "red";
  }

  // Save Query logic

  const handleSave = async () => {
    await fetch("http://localhost:8080/auth/saveQuery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(queryDataWithResult),
      credentials: "include",
    })
      .then((data) => {
        console.log(data);
        console.log(props);
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
          <h4 style={{ color: textColour }}>{bodyText}</h4>

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
                  <td>{props.queryData.alias}</td>
                </tr>
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
                {props.queryData.type_CASH_OUT && (
                  <tr>
                    <td>Transaction Type</td>
                    <td>Cash-out</td>
                  </tr>
                )}
                {props.queryData.type_TRANSFER && (
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
