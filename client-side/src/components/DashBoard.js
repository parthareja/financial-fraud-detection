import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

import { TestContext } from "../contexts/TestContext";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function DashBoard() {
  const { setUser, user } = useContext(TestContext);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("dashboard useEffect new context");
    // console.log(user);
    if (!user) {
      navigate("/signin");
    }
  }, [user]);
  async function logout() {
    const res = await fetch("http://localhost:8080/auth/logout", {
      credentials: "include",
    });
    console.log(res)
    setUser(false);
    console.log(user);
    // localStorage.setItem("user", null)
    navigate("/signin");
  }

  const testButtonFunction = async () => {
    const res = await axios.get("http://localhost:8080/dashboard/test");
    console.log(res);

    if (!res.data) {
      setUser(false);
      alert("You have been logged out, please sign in again.");
    }
  };

  // const testUser = {"firstName":"bruh","lastName":"yesyes","email":"yes@gmail.com"}

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold underline">Dashboard</h1>
      </div>
      <h2>Welcome {user.firstName + " " + user.lastName}</h2>
      <Button className="btn-primary" onClick={testButtonFunction}>
        Test Button
      </Button>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DashBoard;
