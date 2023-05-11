import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";

const ResultModal = (props) => {
  // const [reRender, setReRender] = useState(false);
  const [resultText, setResultText] = useState("default");

  // Text display logic
  var bodyText = "default";
  var textColour = "green";

  if (props.data == "false") {
    bodyText = "This transaction is genuine";
  } else {
    console.log("result to declare FRAUDULENT", props.data);
    bodyText = "This transaction is FRAUDULENT";
    textColour = "red";
  }

  // Save Query logic

  const handleSave = async () => {
    // e.preventDefault();
    // window.location.reload(false);
    // const datajson = {
    //   user_id: user._id,
    //   amount: transactionAmount,
    //   oldbalanceOrg: oldBalanceOrig,
    //   newbalanceOrg: newBalanceOrig,
    //   origBalance_inacc: oldBalanceOrig - transactionAmount - newBalanceOrig,
    //   oldbalanceDest: oldBalanceDest,
    //   newbalanceDest: newBalanceDest,
    //   destBalance_inacc: oldBalanceDest + transactionAmount - newBalanceDest,
    //   type_CASH_OUT: typeCashOut,
    //   type_TRANSFER: typeTransfer,
    //   step: TransactionTime,
    //   alias: transactionAlias,
    // };
    // const ml_datajson_array = [
    //   TransactionTime,
    //   transactionAmount,
    //   oldBalanceOrig,
    //   oldBalanceDest,
    //   oldBalanceOrig - transactionAmount - newBalanceOrig,
    //   oldBalanceDest + transactionAmount - newBalanceDest,
    //   typeCashOut,
    //   typeTransfer,
    // ];

    // console.log("ml query jsondata, ", ml_datajson_array); // console.log(datajson);

    // const POST_ml_query = async (record) => {
    //   const data = [record];
    //   const res = await fetch("http://localhost:5000/ml_query", {
    //     method: "POST",
    //     body: JSON.stringify({ data: data }),
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //   })
    //     .then((res) => res.json())
    //     .then((res) => {
    //       setModalData(res[0]);
    //       console.log("modalData ,", res[0]);
    //       setShowResultModal(true);
    //     });
    // };
    // console.log(props);
    await fetch("http://localhost:8080/auth/saveQuery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.queryData),
      credentials: "include",
    })
      .then((data) => {
        console.log(data);
        props.onHide();
        props.setQueries(!queries);
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
          {/* <p></p> */}
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
