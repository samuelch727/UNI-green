import React from "react";
import { useRouter } from "next/router";
import { Link, Redirect, withRouter } from "react-router-dom";
import { eventNames } from "process";

export default function Home() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      // width: "100vw",
      // height: "100vh",
    }}> 
      <div
      style={{
        position: "relative",
        width: "150px",
        height: "250",
 
      }}
    >
      <img src="person_black_36dp.svg" alt="Account Managemant" style={{ width: "100%" }} />
      <Link to="/Account-Managemant">
        <button className="btn btn-primary">Account Managemant</button>
      </Link>
    </div><div
      style={{
        position: "relative",
        width: "150px",
        height: "150px",
      }}
    >
        <img src="person_black_36dp.svg" alt="Order Managemant" style={{ width: "100%" }} />
        <Link to="/Order-Managemant">
          <button className="btn btn-primary">Order Managemant</button>
        </Link>
      </div><div
        style={{
          position: "relative",
        width: "150px",
        height: "150px",
        }}
      >
        <img src="person_black_36dp.svg" alt="Product Managemant" style={{ width: "100%" }} />
        <Link to="/Product-Managemant">
          <button className="btn btn-primary">Product Managemant</button>
        </Link>
      </div><div
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
        }}
      >
        <img src="person_black_36dp.svg" alt="Financial Report" style={{ width: "100%" }} />
        <Link to="/Financial-Report">
          <button className="btn btn-primary">Financial Report</button>
        </Link>

      </div>
    </div>

    
  );
}
function autoFill(autoFill: any): import("csstype").Property.GridTemplateColumns<string | number> | undefined {
  throw new Error("Function not implemented.");
}

