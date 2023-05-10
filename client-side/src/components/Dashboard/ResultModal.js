import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ResultModal = (props) => {
  var bodyText = "";
  if (props.data == false) {
    const bodyText = "This transaction is genuine";
  } else {
    const bodyText = "This transaction is FRAUDULENT";
  }
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
          {/* <h4>{bodyText}</h4> */}
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
