import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
// import { useContext } from "react";
import { TestContext } from "../contexts/TestContext";

function DashBoard() {
  const { setUser, user } = useContext(TestContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("dashboard useEffect new context");
    console.log(user);
    if (!user) {
      navigate("/signin");
    }
  }, [user]);
  async function logout() {
    const res = await fetch("http://localhost:8080/auth/logout", {
      credentials: "include",
    });
    setUser(false);
    console.log(user);
    // localStorage.setItem("user", null)
    navigate("/signin");
  }

  // const testUser = {"firstName":"bruh","lastName":"yesyes","email":"yes@gmail.com"}

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold underline">Dashboard</h1>
      </div>
      <h2>Welcome {user.firstName + " " + user.lastName}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DashBoard;
