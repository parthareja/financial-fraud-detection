import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";

const ResultModal = (props) => {
  // const [reRender, setReRender] = useState(false);
  const [resultText, setResultText] = useState("default");

  var bodyText = "default";
  var textColour = "green";
  // useEffect(() => {
  //   console.log("modal useEffect");
  //   if (props.data == false) {
  //     setResultText("This transaction is genuine");
  //   } else {
  //     setResultText("This transaction is FRAUDULENT");
  //   }
  //   // setReRender(!reRender);
  // }, [props]);
  if (props.data == "false") {
    bodyText = "This transaction is genuine";
  } else {
    console.log("result to declare FRAUDULENT", props.data);
    bodyText = "This transaction is FRAUDULENT";
    textColour = "red";
  }

  console.log("props data after effect, ", props.data);
  console.log("Text after effect > ", bodyText);
  // console.log("bodyData > ", bodyText);

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
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResultModal;
