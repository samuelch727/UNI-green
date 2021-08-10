import React, { useState } from "react";
import { useRouter } from "next/router";
import { Link, Redirect, withRouter } from "react-router-dom";
import { eventNames } from "process";
import NavBar from "../../components/NavBar";
import { user } from "../../data/userData";

function ParentImport(props: any) {
  let [data, setData] = useState(props.data);

  function handleChange(newData: string, newDataType: string) {
    let saveData = data;
    //@ts-ignore
    saveData[newDataType] = newData;
    setData(saveData);
    props.saveData(data);
  }

  return (
    <div style={{ margin: "0 auto", maxWidth: "1080px" }}>
      <h3 style={{ textAlign: "center", padding: "20px" }}>Parent Account</h3>
      <form className="row g-3">
        <div className="form-floating col-md-6">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            // value={props?.data.email ?? ""}
            onChange={(e) => {
              handleChange(e.target.value, "email");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating col-md-6">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Chan Tai Man"
            // value={props?.data.stdName ?? ""}
            onChange={(e) => {
              handleChange(e.target.value, "stdName");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Student Name</label>
        </div>
        <div className="form-floating col-md-6">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Chan Tai Man"
            // value={props?.data.prtName ?? ""}
            onChange={(e) => {
              handleChange(e.target.value, "prtName");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Parent Name</label>
        </div>
        <div className="form-floating col-md-6">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="1155000000"
            // value={props?.data.sid ?? ""}
            onChange={(e) => {
              handleChange(e.target.value, "sid");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Student Number</label>
        </div>
      </form>
      <button
        className="btn btn-primary"
        style={{
          width: "200px",
          padding: "10px",
          marginBottom: "10px",
          marginTop: "10px",
        }}
        onClick={() => {
          props.addNewUser();
        }}
        disabled={props.isComplete}
      >
        Add new account
      </button>
    </div>
  );
}

function StudentImport(props: any) {
  let [data, setData] = useState(props.data);

  function handleChange(newData: string, newDataType: string) {
    let saveData = data;
    //@ts-ignore
    saveData[newDataType] = newData;
    setData(saveData);
    props.saveData(data);
  }
  return (
    <div style={{ margin: "0 auto", maxWidth: "1080px" }}>
      <h3 style={{ textAlign: "center", padding: "20px" }}>Student Account</h3>
      <form className="row g-3">
        <div className="form-floating col-md-6">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              handleChange(e.target.value, "email");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating col-md-6">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Chan Tai Man"
            onChange={(e) => {
              handleChange(e.target.value, "stdName");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Student Name</label>
        </div>
        <div className="form-floating col-md-6">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Chan Tai Man"
            onChange={(e) => {
              handleChange(e.target.value, "sid");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Student Number</label>
        </div>
      </form>
      <button
        className="btn btn-primary"
        style={{
          width: "200px",
          padding: "10px",
          marginBottom: "10px",
          marginTop: "10px",
        }}
        disabled={props.isComplete}
        onClick={() => {
          props.addNewUser();
        }}
      >
        Add new account
      </button>
    </div>
  );
}

function OtherImport(props: any) {
  let [data, setData] = useState(props.data);

  function handleChange(newData: string, newDataType: string) {
    let saveData = data;
    //@ts-ignore
    saveData[newDataType] = newData;
    setData(saveData);
    props.saveData(data);
  }

  return (
    <div style={{ margin: "0 auto", maxWidth: "1080px" }}>
      <h3 style={{ textAlign: "center", padding: "20px" }}>Other Account</h3>
      <form className="row g-3">
        <div className="form-floating col-md-6">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => {
              handleChange(e.target.value, "email");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating col-md-6">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Chan Tai Man"
            onChange={(e) => {
              handleChange(e.target.value, "name");
            }}
            readOnly={props.isComplete}
          />
          <label htmlFor="floatingInput">Customer Name</label>
        </div>
      </form>
      <button
        className="btn btn-primary"
        style={{
          width: "200px",
          padding: "10px",
          marginBottom: "10px",
          marginTop: "10px",
        }}
        onClick={() => {
          props.addNewUser();
        }}
        disabled={props.isComplete}
      >
        Add new account
      </button>
    </div>
  );
}

function ChoiceType(props: any) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h3 style={{ textAlign: "center", padding: "20px" }}>Create Account</h3>
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
          <button
            className="btn btn-primary"
            style={{ width: "200px" }}
            onClick={() => {
              props.setChoice(1);
            }}
          >
            Parent
          </button>
        </div>
        <div
          style={{
            position: "relative",
            // width: "150px",
          }}
        >
          <button
            className="btn btn-primary"
            style={{ width: "200px" }}
            onClick={() => props.setChoice(2)}
          >
            Student
          </button>
        </div>
        <div
          style={{
            position: "relative",
            // width: "200px",
          }}
        >
          <button
            className="btn btn-primary"
            style={{ width: "200px" }}
            onClick={() => props.setChoice(3)}
          >
            Other Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManualCreateAccount() {
  let [addUser, setAddUser] = useState([]);
  let [choice, setChoice] = useState(false);
  let [complete, setComplete] = useState(false);

  function selectUser(user: number) {
    let userList = addUser;
    //@ts-ignore
    userList.push({ type: user });
    setAddUser(userList);
    //@ts-ignore
    setChoice(user);
    console.log(addUser);
  }

  function addNewUser() {
    setChoice(false);
  }

  function saveData(arrNum: number, data: any) {
    let userList = addUser;
    //@ts-ignore
    userList[arrNum] = data;
    setAddUser(userList);
  }

  return (
    <div>
      <NavBar />
      {addUser.map((content, key) => {
        //@ts-ignore
        if (content.type == 1) {
          return (
            <ParentImport
              key={key}
              addNewUser={addNewUser}
              data={content}
              saveData={(data: any) => {
                saveData(key, data);
              }}
              isComplete={complete}
            />
          );
        }
        //@ts-ignore
        if (content.type == 2) {
          return (
            <StudentImport
              key={key}
              addNewUser={addNewUser}
              data={content}
              saveData={(data: any) => {
                saveData(key, data);
              }}
              isComplete={complete}
            />
          );
        }
        //@ts-ignore
        if (content.type == 3) {
          return (
            <OtherImport
              key={key}
              addNewUser={addNewUser}
              data={content}
              saveData={(data: any) => {
                saveData(key, data);
              }}
              isComplete={complete}
            />
          );
        }
      })}
      {choice ? null : <ChoiceType setChoice={selectUser} />}
      {addUser.length > 0 && !complete ? (
        <div
          style={{
            display: "grid",
            placeItems: "end",
            margin: "0 auto",
            maxWidth: "1080px",
          }}
        >
          <button
            className="btn btn-primary"
            style={{
              width: "200px",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
            onClick={() => {
              setComplete(true);
            }}
          >
            Create Account
          </button>
        </div>
      ) : null}
      {addUser.length > 0 && complete ? (
        <div style={{ margin: "0 auto", maxWidth: "1080px" }}>
          <button
            className="btn btn-primary"
            style={{
              width: "200px",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
            onClick={() => {
              setComplete(false);
            }}
          >
            Edit
          </button>
          <div className="row justify-content-end">
            <button
              className="btn btn-primary col-3"
              style={{
                // width: "200px",
                padding: "10px",
                margin: "10px",
                // marginTop: "10px",
              }}
            >
              Send Notification Email
            </button>
            <button
              className="btn btn-primary col-2"
              style={{
                // width: "200px",
                padding: "10px",
                margin: "10px",
                // marginTop: "10px",
              }}
            >
              Skip
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
