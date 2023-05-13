import { GoogleLogin } from "react-google-login";

const clientId =
  "440183900348-krl09bm7pbvvkcpchvmmb7j88p0a5fh6.apps.googleusercontent.com";

import React from "react";

const Login = () => {
  const onSuccess = () => {
    console.log("Logged In");
    var accessToken = gapi.auth.getToken().accessToken;
    console.log("accesToken > ", accessToken);
  };

  const onFailure = () => {
    console.log("Failed login");
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
