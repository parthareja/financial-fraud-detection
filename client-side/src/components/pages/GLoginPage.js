import React from "react";

import Login from "../GOAuth/Login";
import Logout from "../GOAuth/Logout";

import Col from "react-bootstrap/Col";

const GLoginPage = () => {
  // console.log("glogin page");
  return (
    <div className="flex">
      <Col>Wow</Col>
      <Col>
        Half
        <Login />
      </Col>

      {/* <Logout /> */}
    </div>
  );
};

export default GLoginPage;
