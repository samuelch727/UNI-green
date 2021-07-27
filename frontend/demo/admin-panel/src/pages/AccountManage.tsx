import React from "react";
import { useRouter } from "next/router";
import { Link, Redirect, withRouter } from "react-router-dom";
import { eventNames } from "process";
import NavBar from "../components/NavBar";

export default function Home(props: any) {
  return (
    <div>
      <NavBar />
      <h3 style={{ textAlign: "center", padding: "10px" }}>
        Account Management
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          columnGap: "15px",
          rowGap: "15px",
          placeItems: "center",
          margin: "0 auto",
          maxWidth: "1080px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "150px",
            height: "250",
          }}
        >
          <img
            src="person_black_36dp.svg"
            alt="Account Managemant"
            style={{ width: "100%" }}
          />
          <Link to="/create-user-account">
            <button className="btn btn-primary">Create User Account</button>
          </Link>
        </div>
        <div
          style={{
            position: "relative",
            width: "150px",
          }}
        >
          <img
            src="person_black_36dp.svg"
            alt="Order Managemant"
            style={{ width: "100%" }}
          />
          <Link to="/verify-user-account">
            <button className="btn btn-primary">Verify User Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
function autoFill(
  autoFill: any
): import("csstype").Property.GridTemplateColumns<string | number> | undefined {
  throw new Error("Function not implemented.");
}
