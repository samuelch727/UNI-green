import React, { useState } from "react";
import NavBar from "../../components/NavBar";

function DemoCustomerBlock(props: any) {
  return (
    <div className="container" style={{ paddingBottom: "10px" }}>
      <div
        style={{ background: "white", borderRadius: "10px", padding: "5px" }}
        onClick={() => {
          props.handleClick();
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="d-inline-flex">Ms Chan Man Man</div>
          <div className="d-inline-flex">12345678</div>
        </div>
        <div className="d-inline-flex">cmm123@gmail.com</div>
      </div>
    </div>
  );
}
function DemoProductBlock(props: any) {
  return (
    <div className="container" style={{ paddingBottom: "10px" }}>
      <div
        style={{
          background: "lightgrey",
          borderRadius: "10px",
          padding: "5px",
        }}
        onClick={() => {
          props.confirmProduct();
        }}
      >
        <div className="d-inline-flex">S127</div>
        <div className="d-flex justify-content-between">
          <div className="d-inline-flex">Grils Jumper</div>
          <div className="d-inline-flex">S</div>
        </div>
      </div>
    </div>
  );
}

function AddedProductBlock(props: any) {
  return (
    <div
      className="container row"
      style={{ paddingTop: "10px", paddingBottom: "10px" }}
    >
      <div
        className="col-9"
        style={{
          background: "lightgrey",
          borderRadius: "10px",
          borderWidth: "5px",
          borderColor: "red",
        }}
      >
        <div className="row" style={{ height: "30px" }}>
          <div className="col-3">S1270</div>
          <div className="col-5">Boys Gym Wear</div>
          <div className="col-2">S</div>
          <div className="col-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </div>
        </div>
      </div>
      <div
        className="col-3"
        style={{ display: "grid", placeContent: "center" }}
      >
        60
      </div>
    </div>
  );
}

function OrderBlock() {
  let [customerInput, setCustomerInput] = useState({
    category: 0,
    search: "",
  });
  let [numNeeded, setNumNeeded] = useState(1);
  let [showDemoCustomer, setShowDemoCustomer] = useState(false);
  let [showDemoProduct, setShowDemoProduct] = useState(false);
  let [selectedProduct, setSelectedProduct] = useState(false);
  let [selectedCustomer, setSelectedCustomer] = useState(false);
  let [numOfProduct, setNumOfProduct] = useState(0);
  let [arrOfProduct, setArrOfProduct] = useState([]);

  function handleSelectCustomer() {
    setSelectedCustomer(true);
  }

  function addProduct(num: any) {
    setNumOfProduct(num + numOfProduct);
    let temp = arrOfProduct;
    for (let i = 0; i < num; i++) {
      //@ts-ignore
      temp.push(1);
    }
    setArrOfProduct(temp);
  }

  function handleChange() {
    console.log(customerInput);
    if (customerInput.category == 0 && customerInput.search == "")
      setShowDemoCustomer(false);
    else setShowDemoCustomer(true);
  }
  function handleProductSelect() {
    setSelectedProduct(true);
    addProduct(numNeeded);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-4" style={{ padding: "0", background: "lightgrey" }}>
        <h5
          style={{
            background: "grey",
            margin: "0",
            padding: "5px",
            color: "white",
          }}
        >
          Customer
        </h5>
        <div style={{ background: "lightgrey" }}>
          {selectedCustomer ? null : (
            <form>
              <div
                className="row justify-content-end"
                style={{ margin: "0", padding: "10px" }}
              >
                <select
                  className="form-select col-3"
                  style={{ padding: "5px", marginBottom: "10px" }}
                  onChange={(e) => {
                    let temp = customerInput;
                    //@ts-ignore
                    temp["category"] = e.target.value;
                    console.log(e.target.value);
                    setCustomerInput(temp);
                    handleChange();
                  }}
                >
                  <option selected value="0">
                    Customer Category
                  </option>
                  <option value="1">Parent</option>
                  <option value="2">Student</option>
                  <option value="3">Other</option>
                </select>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    🔍
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Phone No./
                  Email/ Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      let temp = customerInput;
                      temp["search"] = e.target.value;
                      console.log(e.target.value);
                      setCustomerInput(temp);
                      handleChange();
                    }}
                  />
                </div>
              </div>
            </form>
          )}

          {showDemoCustomer ? (
            <DemoCustomerBlock
              handleClick={() => {
                handleSelectCustomer();
              }}
            />
          ) : null}
        </div>
      </div>
      <div className="col-7" style={{ padding: "0" }}>
        <h5 style={{ background: "lightgrey", margin: "0", padding: "5px" }}>
          Product
        </h5>
        <div>
          {arrOfProduct.length > 0 ? (
            <div className="container row justify-content-end">
              <div
                className="col-3"
                style={{ display: "grid", placeContent: "center" }}
              >
                $
              </div>
            </div>
          ) : null}
          {arrOfProduct.map((content, key) => {
            return <AddedProductBlock key={key} />;
          })}
          {arrOfProduct.length > 0 ? (
            <div className="container row justify-content-end">
              <div
                className="col-3"
                style={{ display: "grid", placeContent: "center" }}
              >
                {arrOfProduct.length * 60}
              </div>
            </div>
          ) : null}
          {selectedProduct ? (
            <div
              className="col"
              style={{
                display: "grid",
                placeItems: "center",
                marginTop: "10px",
              }}
            >
              <button
                className="btn btn-secondary "
                style={{ fontSize: "18px" }}
                onClick={() => {
                  setSelectedProduct(false);
                  setShowDemoProduct(false);
                  setNumNeeded(1);
                }}
              >
                + Add Product
              </button>
            </div>
          ) : (
            <form>
              <div
                className="row"
                style={{ margin: "0", padding: "10px", paddingBottom: "0" }}
              >
                <select
                  className="form-select col mb-3"
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginBottom: "0",
                  }}
                  disabled
                >
                  <option selected>Product Category</option>
                  <option value="1">Parent</option>
                  <option value="2">Student</option>
                  <option value="3">Other</option>
                </select>
                <select
                  className="form-select col mb-3"
                  style={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginBottom: "0",
                  }}
                  disabled
                >
                  <option selected>Product Type</option>
                  <option value="1">Parent</option>
                  <option value="2">Student</option>
                  <option value="3">Other</option>
                </select>
              </div>
              <div className="row" style={{ margin: "0", padding: "10px" }}>
                <div className="input-group col mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    🔍
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Product Code"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      console.log(e.target.value);
                      let temp = e.target.value;
                      //   setProductCode(temp);
                      if (e.target.value == "") setShowDemoProduct(false);
                      else setShowDemoProduct(true);
                    }}
                  />
                </div>
                <div className="input-group col mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Randomly pick
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter No."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      //@ts-ignore
                      setNumNeeded(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
          )}

          {showDemoProduct && !selectedProduct ? (
            <DemoProductBlock confirmProduct={handleProductSelect} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function CreateNewOrder() {
  let [newOrderList, setNewOrderList] = useState([1]);
  let [countNum, setCountNum] = useState(1);
  let [isComplete, setIsComplete] = useState(false);
  function handleClick() {
    let temp = newOrderList;
    temp.push(1);
    setCountNum(countNum + 1);
    setNewOrderList(temp);
    console.log(newOrderList);
  }
  return (
    <div>
      <NavBar />
      <div style={{ margin: "0 auto", maxWidth: "1080px" }}>
        <h3 style={{ textAlign: "center", padding: "10px" }}>
          Create New Order
        </h3>
        {newOrderList.map((content, key) => {
          //@ts-ignore
          if (content == 1) return <OrderBlock key={key} content={content} />;
        })}
        {isComplete ? null : (
          <div className="row justify-content-center">
            <button
              className="btn btn-primary col-1"
              style={{ fontSize: "28px" }}
              onClick={() => handleClick()}
            >
              +
            </button>
          </div>
        )}

        <div className="row justify-content-end ">
          <button
            type="button"
            className="btn btn-outline-secondary col-1"
            style={{ margin: "10px" }}
            onClick={() => {
              setIsComplete(false);
            }}
          >
            {isComplete ? "edit" : "cancel"}
          </button>
          <button
            className="btn btn-primary col-1"
            style={{ margin: "10px" }}
            onClick={() => {
              setIsComplete(true);
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
