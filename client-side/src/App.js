import { Route, Routes, Link } from "react-router-dom";
import React, { useDebugValue, useEffect, useState, useMemo } from "react";

import axios from "axios";
import { gapi } from "gapi-script";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AuthApi from "./utils/AuthApi";
import DashBoard from "./components/Dashboard/DashBoard";
import TestDev from "./components/TestDev";
import GLoginPage from "./components/pages/GLoginPage";

import loadGoogleScripts from "./scripts/loadGoogleScripts";

import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";
import { TestContext } from "./contexts/TestContext";

const clientId =
  "440183900348-krl09bm7pbvvkcpchvmmb7j88p0a5fh6.apps.googleusercontent.com";

function App() {
  // const loadGoogleScripts = (callback) => {
  //   const existingScript = document.getElementById("gAuthScripts");
  //   if (!existingScript) {
  //     const script = document.createElement("script");
  //     script.src = "https://accounts.google.com/gsi/client";
  //     script.id = "gAuthScripts";
  //     document.head.appendChild(script);
  //     script.onload = () => {
  //       if (callback) callback();
  //     };
  //   }
  //   if (existingScript && callback) callback();
  // };
  // loadGoogleScripts(() => {
  //   "called google scripts";
  // });
  // const {user} = useUser();
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useState(false);
  const [backendData, setBackendData] = useState([{}]);

  const handleCallBackResponse = () => {};

  useEffect(() => {
    /* global google */
    // loadGoogleScripts(() => {
    //   "called google scripts";
    // });
  }, []);
  const bruh = JSON.stringify(backendData);
  // console.log("App bruh backendData");
  // console.log(user);
  // console.log(bruh);

  // setBackendData({ users: ["chamar"] });

  return (
    <div className="App">
      <TestContext.Provider value={{ user, setUser }}>
        {/* <UserProvider> */}
        <AuthProvider>
          <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/" element={<GLoginPage />} />
            {/* <Route path="/glogin" element={<GLoginPage />} /> */}
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/login" element={<GLoginPage />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route
              path="/testdev"
              element={<TestDev backendDataDev={bruh} />}
            />
            {/* <Route
            path="/testdev"
            element={
              <TestDev backendDataDev={{ users: ["chamar", "da Phodda"] }} />
          } /> */}
          </Routes>
        </AuthProvider>
        {/* </UserProvider> */}
      </TestContext.Provider>
    </div>
  );
}

export default App;
