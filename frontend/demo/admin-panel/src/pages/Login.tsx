import React from "react";
import { useRouter } from "next/router";
import { Link, Redirect, withRouter } from "react-router-dom";
import { eventNames } from "process";

function Login() {
  function handleSubmit() {
    console.log("Redirect");
    <Redirect to="/somewhere" />;
  }

  return (
    <div
      style={{
        display: "inline-grid",
        gridAutoFlow: "row",
        gridTemplateColumns: "1fr 1fr 1fr",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "40vw",
          background: "#0b6e4f",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "60px",
            width: "30vw",
            textAlign: "right",
            fontFamily: "'Encode Sans SC', sans-serif",
          }}
        >
          UNI
          <br />
          GREEN
        </div>
      </div>
      <div
        style={{
          height: "100vh",
          width: "60vw",
          background: "white",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div style={{ width: "50vw" }}>
          <h1 style={{ marginBottom: "30px" }}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value="admin"
                />
              </div>
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value="admin"
                />
              </div>
            </div>
          </form>
          <Link to="/home">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Login);
