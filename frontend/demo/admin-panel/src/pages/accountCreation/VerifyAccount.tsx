import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";

let demoUserInfo = [
  {
    type: "Student",
    name: "Lam Siu Man",
    phoneNo: "93458791",
    email: "lsm2007@gmail.com",
    relatedStd: "Lam Siu Man",
    sid: "367809",
    form: "4",
    select: false,
  },
  {
    type: "Student",
    name: "Lam Siu Man",
    phoneNo: "93458791",
    email: "lsm2007@gmail.com",
    relatedStd: "Lam Siu Man",
    sid: "367809",
    form: "4",
    select: false,
  },
  {
    type: "Student",
    name: "Lam Siu Man",
    phoneNo: "93458791",
    email: "lsm2007@gmail.com",
    relatedStd: "Lam Siu Man",
    sid: "367809",
    form: "4",
    select: false,
  },
  {
    type: "Student",
    name: "Lam Siu Man",
    phoneNo: "93458791",
    email: "lsm2007@gmail.com",
    relatedStd: "Lam Siu Man",
    sid: "367809",
    form: "4",
    select: false,
  },
  {
    type: "Student",
    name: "Lam Siu Man",
    phoneNo: "93458791",
    email: "lsm2007@gmail.com",
    relatedStd: "Lam Siu Man",
    sid: "367809",
    form: "4",
    select: false,
  },
  {
    type: "Student",
    name: "Lam Siu Man",
    phoneNo: "93458791",
    email: "lsm2007@gmail.com",
    relatedStd: "Lam Siu Man",
    sid: "367809",
    form: "4",
    select: false,
  },
  {
    type: "Student",
    name: "Lam Siu Man",
    phoneNo: "93458791",
    email: "lsm2007@gmail.com",
    relatedStd: "Lam Siu Man",
    sid: "367809",
    form: "4",
    select: false,
  },
  {
    type: "Student",
    name: "Lam Siu Man",
    phoneNo: "93458791",
    email: "lsm2007@gmail.com",
    relatedStd: "Lam Siu Man",
    sid: "367809",
    form: "4",
    select: false,
  },
];

function VerifyAccountBlock(props: any) {
  let [select, setSelect] = useState(false);

  console.log("block: " + typeof props.select);
  return (
    <div className="row" style={{ marginTop: "20px", marginBottom: "20px" }}>
      <div className="" style={{ width: "20px" }}>
        <input
          className="form-check-input"
          type="checkbox"
          value="checked"
          id="flexCheckDefault"
          onChange={(e) => {
            console.log(e.target.value);
          }}
          onClick={() => {
            setSelect(!select || props.select);
          }}
          checked={select || props.select}
        ></input>
      </div>
      <div
        className=""
        style={{ width: "154.28px" }}
        // style={{ color: "blue", cursor: "pointer" }}
        // onClick={() => {
        //   props.handleClick();
        // }}
      >
        {props.content.type}
      </div>
      <div className="" style={{ width: "154.28px" }}>
        {props.content.name}
      </div>
      <div className="" style={{ width: "154.28px" }}>
        {props.content.phoneNo}
      </div>
      <div className="" style={{ width: "154.28px" }}>
        {props.content.email}
      </div>
      <div className="" style={{ width: "154.28px" }}>
        {props.content.relatedStd}
      </div>
      <div className="" style={{ width: "154.28px" }}>
        {props.content.sid}
      </div>
      <div className="" style={{ width: "154.28px" }}>
        {props.content.form}
      </div>
    </div>
  );
}

function DeleteScreen(props: any) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
        // background: "lightgrey",
        // opacity: "0.5",
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: "40vw",
          display: "grid",
          placeItems: "center",
          background: "lightgrey",
          opacity: "1",
          zIndex: 4,
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ zIndex: 4 }}>Confirm Delete Account?</h3>
        <div className="row justify-content-end">
          <button
            type="button"
            className="col btn btn-danger"
            style={{ marginRight: "5px", marginLeft: "10px" }}
            onClick={() => {
              props.handleClick();
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className="col btn btn-primary"
            style={{ marginRight: "5px", marginLeft: "10px" }}
            onClick={() => {
              props.handleClick();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyAccount() {
  let [selectAll, setSelectAll] = useState(false);
  let [showDelete, setShowDelete] = useState(false);

  return (
    <div>
      {showDelete ? (
        <DeleteScreen
          handleClick={() => {
            setShowDelete(false);
          }}
        />
      ) : null}
      <NavBar />
      <div style={{ margin: "0 auto", maxWidth: "1080px" }}>
        <h3 style={{ textAlign: "center", padding: "10px" }}>
          Verify User Account
        </h3>
        <div className="row justify-content-evenly">
          <div className="col-1">
            <input
              className="form-check-input"
              type="checkbox"
              value="checked"
              id="flexCheckDefault"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              onClick={() => {
                setSelectAll(!selectAll);
              }}
              checked={selectAll}
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
            </svg>
          </div>
          <div className="col-4 row" style={{ height: "24px" }}>
            <Link to="/edit-user" className="col" style={{ padding: "0" }}>
              <button
                type="button"
                className=" btn btn-primary"
                style={{ marginRight: "5px" }}
              >
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="col btn btn-primary"
              style={{ marginRight: "5px" }}
            >
              Label
            </button>
            <button
              type="button"
              className="col btn btn-primary"
              style={{ marginRight: "5px" }}
              onClick={() => {
                setShowDelete(true);
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="col btn btn-primary"
              style={{ marginRight: "5px" }}
            >
              More
            </button>
          </div>
          <div className="input-group col mb-3">
            <span className="input-group-text" id="basic-addon1">
              🔍
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "0",
              }}
              disabled
            >
              <option selected>Sort Order</option>
              <option value="1">Parent</option>
              <option value="2">Student</option>
              <option value="3">Other</option>
            </select>
          </div>
          <div className="col">
            <select
              className="form-select"
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "0",
              }}
              disabled
            >
              <option selected>Sort Category</option>
              <option value="1">Parent</option>
              <option value="2">Student</option>
              <option value="3">Other</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="" style={{ width: "20px" }} />
          <div className="col">Type</div>
          <div className="col">Name</div>
          <div className="col">Phone No.</div>
          <div className="col">Email</div>
          <div className="col">Related Student</div>
          <div className="col">Student No.</div>
          <div className="col">Form</div>
        </div>
        {demoUserInfo.map((content, key) => {
          console.log(selectAll);
          return (
            <VerifyAccountBlock
              content={content}
              key={key}
              select={selectAll}
            />
          );
        })}
      </div>
    </div>
  );
}
