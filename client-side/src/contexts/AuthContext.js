import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
// import { useContext } from "react";
import { TestContext } from "../contexts/TestContext";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { user, setUser } = useContext(TestContext);

  useEffect(() => {
    defaultLogin();
    // eslint-disable-next-line
  }, []);

  const login = async ({ username, password }) => {};
  const register = async ({}) => {};

  const logout = async () => {
    const res = await fetch("http://localhost:8080/auth/logout", {
      credentials: "include",
    });
    setUser(false);
    // console.log(user);
    // localStorage.setItem("user", null)
    navigate("/");
  };

  const defaultLogin = async () => {
    if (user !== false) {
      return;
    }
    try {
      //   const response = await axios({
      //     method: "GET",
      //     url: `${process.env.REACT_APP_SERVER_URL}/user`,
      //     withCredentials: true,
      //   });

      //   const data = response.data;
      //   if (data.success) {
      //     setUser(data.user);
      //   }

      // console.log("Inside defaultLogin", user);
      // setUser(undefined);

      const temp = await axios.get(
        "http://localhost:8080/auth/defaultLoginJWTGetUser",
        {
          withCredentials: true,
        }
      );

      var authorized = temp.data;
      console.log("authorized", authorized);

      // setUser("this doesn't work");
      // console.log(user);
      // .then((res) => {
      //   console.log("axios res", res);
      // });
      // console.log("axios res", temp.data);
      // console.log(user);
      // console.log(authorized.body);
      if (authorized == false) {
        setUser(false);
      } else {
        setUser(authorized);
        // console.log(user);
      }
    } catch (err) {
      return err;
    }

    // setLoading(false);
  };

  const value = { login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
