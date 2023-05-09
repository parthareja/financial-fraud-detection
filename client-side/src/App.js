import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import React, { useDebugValue, useEffect, useState, useMemo } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import AuthApi from "./utils/AuthApi";
import DashBoard from "./components/Dashboard/DashBoard";
import TestDev from "./components/TestDev";

import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";
import { TestContext } from "./contexts/TestContext";

function App() {
  // const {user} = useUser();
  axios.defaults.withCredentials = true;
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useState(false);
  const [backendData, setBackendData] = useState([{}]);

  // const value = "My Context Value";

  // const { user, setUser } = useUser;

  // console.log("Outside useEffect", user);
  // setUser(undefined);
  useEffect(() => {
    // console.log("Inside useEffect", user);
    // setUser(undefined);
    const fetchData = async () => {
      await fetch("/api")
        .then((response) => response.json())
        .then((data) => setBackendData(data));
    };

    // fetchData();

    // const defaultLogin = async (user, setUser) => {
    //   console.log("Inside defaultLogin", user);
    //   // setUser(undefined);

    //   const temp = await axios("http://localhost:8080/auth/jwtGetUser", {
    //     withCredentials: true,
    //   });

    //   var authorized = temp.data;
    //   // .then((res) => {
    //   //   console.log("axios res", res);
    //   // });
    //   // console.log("axios res", temp.data);
    //   // console.log(user);
    //   // console.log(authorized.body);
    //   if (authorized === false) {
    //     setUser(undefined);
    //   } else {
    //     setUser(authorized);
    //   }
    // };
    // defaultLogin(user, setUser);
  }, []);
  const bruh = JSON.stringify(backendData);
  console.log("App bruh backendData");
  // console.log(user);
  console.log(bruh);

  // setBackendData({ users: ["chamar"] });

  return (
    <div className="App">
      <TestContext.Provider value={{ user, setUser }}>
        {/* <UserProvider> */}
        <AuthProvider>
          <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/" element={<SignUp />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
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
