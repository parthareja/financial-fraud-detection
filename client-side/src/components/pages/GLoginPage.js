import React from "react";

import Login from "../GOAuth/Login";
import Logout from "../GOAuth/Logout";

import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import { Container } from "@mui/material";

const GLoginPage = () => {
  // console.log("glogin page");
  return (
    <div style={{ height: "100vh" }} className="flex">
      <div className="flex w-3/4">
        <img style={{ objectFit: "cover" }} src="../../../img/greenLogin.jpg" />
      </div>
      <div
        style={{ backgroundColor: "rgb(230, 235, 229)" }}
        className="flex w-1/4 p-4"
      >
        <div style={{ position: "absolute", top: "40%", alignSelf: "center" }}>
          Financial-Fraud-Detection
        </div>
        <div style={{ position: "absolute", top: "50%" }}>
          <Login />
        </div>
      </div>

      {/* <Logout /> */}
    </div>
  );
};

export default GLoginPage;
