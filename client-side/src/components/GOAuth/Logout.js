import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId ="440183900348-krl09bm7pbvvkcpchvmmb7j88p0a5fh6.apps.googleusercontent.com"

const Logout = () => {
  const onSuccess = () => {
    console.log("Logged Out");
  };

  const onFailure = () => {
    console.log("Failed to Logout");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
