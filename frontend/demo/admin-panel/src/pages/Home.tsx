import React from "react";
import { useRouter } from "next/router";
import { Link, Redirect, withRouter } from "react-router-dom";
import { eventNames } from "process";

export default function Home(props: any) {
  return (
    <div
      style={{
        ...props.style,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        columnGap: "15px",
        rowGap: "15px",
        placeItems: "center",
        margin: "0 auto",
        maxWidth: "1080px",
        // width: "auto",
        // height: "100vh",
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
        <Link to="/account-managemant">
          <button className="btn btn-primary">Account Managemant</button>
        </Link>
      </div>
      <div
        style={{
          position: "relative",
          width: "150px",
          // height: "150px",
        }}
      >
        <img
          src="person_black_36dp.svg"
          alt="Order Managemant"
          style={{ width: "100%" }}
        />
        <Link to="/order-managemant">
          <button className="btn btn-primary">Order Managemant</button>
        </Link>
      </div>
      <div
        style={{
          position: "relative",
          width: "150px",
          // height: "150px",
        }}
      >
        <img
          src="./person_black_36dp.svg"
          alt="Product Managemant"
          style={{ width: "100%" }}
        />
        <Link to="/product-managemant">
          <button className="btn btn-primary">Product Managemant</button>
        </Link>
      </div>
      <div
        style={{
          position: "relative",
          width: "150px",
          // height: "150px",
        }}
      >
        <img
          src="person_black_36dp.svg"
          alt="Financial Report"
          style={{ width: "100%" }}
        />
        <Link to="/financial-report">
          <button className="btn btn-primary">Financial Report</button>
        </Link>
      </div>
    </div>
  );
}
function autoFill(
  autoFill: any
): import("csstype").Property.GridTemplateColumns<string | number> | undefined {
  throw new Error("Function not implemented.");
}
