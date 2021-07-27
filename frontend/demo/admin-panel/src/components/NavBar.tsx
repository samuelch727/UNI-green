import React from "react";
import { Redirect, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div
      style={{
        width: "100vw",
        height: "60px",
        background: "lightgrey",
        // position: "absolute",
        top: "0",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <nav>
        <div
          style={{
            margin: "0 auto",
            alignItems: "center",
            maxWidth: "1080px",
            height: "40px",
          }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ height: "40px" }}
          >
            <div
              className="d-flex flex-row"
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                fontSize: "26px",
              }}
            >
              Icon
            </div>
            <div
              className="d-flex flex-row"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              Account Management
            </div>
            <div
              className="d-flex flex-row"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              Order Management
            </div>
            <div
              className="d-flex flex-row"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              Product Management
            </div>
            <div
              className="d-flex flex-row"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              Financial Report
            </div>
            <div
              className="d-flex flex-row"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <Link to="/home">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                  style={{ margin: "5px" }}
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
                style={{ margin: "5px" }}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
                style={{ margin: "5px" }}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
