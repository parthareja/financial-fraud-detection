import React from "react";
import Login from "../GOAuth/Login";
import Logout from "../GOAuth/Logout";

const GLoginPage = () => {
  console.log("glogin page");
  return (
    <div>
      <Login />
      <Logout />
    </div>
  );
};

export default GLoginPage;
