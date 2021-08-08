import React, { useState } from "react";
import NavBar from "../../components/NavBar";

export default function EditUser() {
  return (
    <div>
      <NavBar />
      <div style={{ margin: "0 auto", maxWidth: "1080px" }}>
        <h3 style={{ textAlign: "center", padding: "10px" }}>
          Edit User Account
        </h3>
        <div className="row">
          <div className="col">
            <h4>Personal Information</h4>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col-3">Type:</div>
              <input
                className="form-control col"
                placeholder="Type to search..."
                value="Parent"
                style={{ height: "24px" }}
              />
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col-3">Name:</div>
              <input
                className="form-control col"
                placeholder="Type to search..."
                value="Ms Chan Man Man"
                style={{ height: "24px" }}
              />
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col-3">Email:</div>
              <input
                className="form-control col"
                placeholder="Type to search..."
                value="cmm123@gmail.com"
                style={{ height: "24px" }}
              />
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col-3">Phone:</div>
              <input
                className="form-control col"
                placeholder="Type to search..."
                value="97778331"
                style={{ height: "24px" }}
              />
            </div>
          </div>
          <div className="col">
            <h4>Related Student</h4>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col-3">Related Student:</div>
              <div className="col-3">Lam Siu Man</div>
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col-3">Student No.:</div>
              <div className="col-3">3678093128</div>
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col-3">Form:</div>
              <div className="col-3">4</div>
            </div>
            <div className="row justify-content-end">
              <button
                type="button"
                className="col-5 btn btn-outline-secondary"
                disabled
              >
                Change Related Student
              </button>
            </div>
            <div className="row justify-content-end">
              <button
                type="button"
                className="col-6 btn btn-outline-secondary"
                style={{ marginTop: "10px" }}
                disabled
              >
                Add New Related Student
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <button
            type="button"
            className="col-1 btn btn-primary"
            style={{ marginTop: "30px" }}
            disabled
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
