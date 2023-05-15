import React from "react";

import Login from "../GOAuth/Login";
import Logout from "../GOAuth/Logout";

import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import { Container } from "@mui/material";

const GLoginPage = () => {
  // console.log("glogin page");
  return (
    <div style={{ height: "100vh" }} className="flex w-screen">
      <div className="flex w-4/5">
        <img style={{ objectFit: "cover" }} src="../../../img/greenLogin.jpg" />
      </div>
      <div
        style={{ backgroundColor: "rgb(230, 235, 229)" }}
        className="w-1/5 px-6 py-72 align-middle align-center"
      >
        <span className="align-center">
          <h5 className="flex p-4 ">Financial-Fraud-Detection</h5>
        </span>
        <span className="align-center">
          <Login />
        </span>
      </div>

      {/* <Logout /> */}
    </div>
  );
};

export default GLoginPage;
