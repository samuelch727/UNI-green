import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { setInterval } from "timers";

export default function UnknowPath() {
  let [redirect, setRedirect] = useState(false);
  setTimeout(() => {
    console.log("redirect");
    setRedirect(true);
  }, 1500);
  return redirect ? (
    <Redirect to="/home" />
  ) : (
    <div
      style={{
        display: "grid",
        height: "100vh",
        width: "100vw",
        placeItems: "center",
      }}
    >
      <h1 style={{ color: "#e63946" }}>
        Page not found. Redirecting back to home...
      </h1>
      {}
    </div>
  );
}
