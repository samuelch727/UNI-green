import React from "react";
import { useRouter } from "next/router";
import { Link, Redirect, withRouter } from "react-router-dom";
import { eventNames } from "process";
import NavBar from "../../components/NavBar";

export default function CreateUserAccount(props: any) {
  return (
    <div>
      <NavBar />
      <h3 style={{ textAlign: "center", padding: "10px" }}>
        Create User Account
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
            // width: "150px",
            // height: "250",
          }}
        >
          <Link to="/account-managemant/create-user-account">
            <button className="btn btn-primary" disabled>
              Upload Excel
            </button>
          </Link>
        </div>
        <div
          style={{
            position: "relative",
            // width: "150px",
          }}
        >
          <Link to="/account-managemant/manual-create-account">
            <button className="btn btn-primary">Manual Create</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
