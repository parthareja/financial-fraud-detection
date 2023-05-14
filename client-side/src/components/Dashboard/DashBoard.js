import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
// import { useContext } from "react";
import { TestContext } from "../../contexts/TestContext";
import { useAuth } from "../../contexts/AuthContext";

import SideBar from "./SideBar";
import ContentDashboard from "./ContentDashboard";

function DashBoard() {
  const { logout } = useAuth();
  const { setUser, user } = useContext(TestContext);
  const [queriesUpdate, setQueriesUpdate] = useState(0);
  // setQueries(1);
  // console.log("Dashboard queries, ", queriesUpdate);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("dashboard useEffect new context");
    // console.log(user);
    if (!user) {
      navigate("/");
    }
  }, [user, queriesUpdate]);

  // const testUser = {"firstName":"bruh","lastName":"yesyes","email":"yes@gmail.com"}

  return (
    <div className="flex flex-row bg-neutral-100 w-screen h-screen">
      {/* <div className="bg-sky-200">
        sidebar
      </div> */}

      <SideBar
        handleLogout={logout}
        WelcomeUser={user}
        queriesUpdate={queriesUpdate}
        setQueriesUpdate={setQueriesUpdate}
      />
      {/* <div className="p-4">
        <div className="bg-slate-500">
          main
        </div>
      </div> */}
      <ContentDashboard
        queriesUpdate={queriesUpdate}
        setQueriesUpdate={setQueriesUpdate}
      />
    </div>
  );
}

export default DashBoard;
