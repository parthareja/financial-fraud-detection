import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
// import { useContext } from "react";
import { TestContext } from "../../contexts/TestContext";
import SideBar from "./SideBar";

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
    // <div>
    //   <div>
    //     <h1 className="text-3xl font-bold underline">Dashboard</h1>
    //   </div>
    //   <h2>Welcome {user.firstName + " " + user.lastName}</h2>
    //   <button onClick={logout}>Logout</button>
    // </div>


    // <div className="h-screen w-screen  bg-slate-300">
    //   <div className = "flex bg-slate-600 bg-slate">
    //     <div className = "bg-orange-300 w-1/4 min-h-screen">
    //       {/* <h1>side</h1> */}
    //       <SideBar/>
    //     </div>
    //     <div>
    //       {/* <h1>main</h1> */}
    //     </div>
    //   </div>
    // </div>



    <div className="flex flex-row bg-neutral-100 w-screen h-screen">
      {/* <div className="bg-sky-200">
        sidebar
      </div> */}
      <SideBar/>
      <div className="p-4">
        <div className="bg-slate-500">
          main
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
