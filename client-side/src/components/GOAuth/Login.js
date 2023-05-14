import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

import { gapi } from "gapi-script";
import jwt_decode from "jwt-decode";

import { useContext } from "react";
import { TestContext } from "../../contexts/TestContext";

const clientId =
  "440183900348-krl09bm7pbvvkcpchvmmb7j88p0a5fh6.apps.googleusercontent.com";

import React, { useEffect } from "react";

const Login = () => {
  const { user, setUser } = useContext(TestContext);

  useEffect(() => {
    if (user) {
      // console.log("signin user value", user);
      navigate("/dashboard");
    }

    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCallBackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, [user]);

  const navigate = useNavigate();

  const handleCallBackResponse = async (response) => {
    // console.log("JWT TOLKIEN > ", response.credential);
    var decodedJWT = jwt_decode(response.credential);
    console.log("decoded jwt", jwt_decode(response.credential));
    var data = {
      _id: decodedJWT.sub,
      name: decodedJWT.name,
      email: decodedJWT.email,
      picture: decodedJWT.picture,
    };
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify({ jwt: response.credential }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        console.log();
        setUser(data);
        navigate("/dashboard");
      });
    });
    // setUser(data);
    // navigate("/dashboard");
  };

  const onFailure = () => {
    console.log("Failed login");
  };

  return <div id="signInDiv"></div>;
};

export default Login;
