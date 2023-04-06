import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AuthApi from "./utils/AuthApi";
import DashBoard from "./components/DashBoard";
import TestDev from "./components/TestDev";
import React, { useDebugValue, useEffect, useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api")
        .then((response) => response.json())
        .then((data) => setBackendData(data));
    };
    fetchData();
  }, []);
  const bruh = JSON.stringify(backendData);
  console.log("App bruh backendData");
  console.log(bruh);

  // setBackendData({ users: ["chamar"] });

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/testdev"
          element={<TestDev backendDataDev={ bruh } />}
        />
        {/* <Route
          path="/testdev"
          element={
            <TestDev backendDataDev={{ users: ["chamar", "da Phodda"] }} /> */}
        } />
      </Routes>
    </div>
  );
}

export default App;
