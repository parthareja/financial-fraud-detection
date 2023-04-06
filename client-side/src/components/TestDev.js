import React from "react";

const TestDev = (props) => {
  console.log("testdev backendData");
  console.log(props.backendDataDev);
  return (
    <div>
      <h1>wow</h1>
      <p>Test Development Backend Environment </p>
      <ul>
        {props.backendDataDev.users.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestDev;
