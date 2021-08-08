import React, { useState } from "react";
import NavBar from "../../components/NavBar";

function OrderListDetail(props: any) {
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
        ></input>
      </div>
      <div
        className="col"
        style={{ color: "blue", cursor: "pointer" }}
        onClick={() => {
          props.handleClick();
        }}
      >
        203459
      </div>
      <div className="col">19/03/2001</div>
      <div className="col">Parent</div>
      <div className="col">Ms Chan Man Man</div>
      <div className="col">cmm123@gmail.com</div>
      <div className="col">97778331</div>
    </div>
  );
}

function OrderList(props: any) {
  return (
    <div>
      <h3 style={{ textAlign: "center", padding: "10px" }}>Order List</h3>
      <div className="row justify-content-evenly">
        <div className="col">
          <input
            className="form-check-input"
            type="checkbox"
            value="checked"
            id="flexCheckDefault"
            onChange={(e) => {
              console.log(e.target.value);
            }}
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
        <div className="input-group col mb-3">
          <span className="input-group-text" id="basic-addon1">
            🔍
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Keyword"
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
            <option selected>Sort By</option>
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
            <option selected>Show 24 results</option>
            <option value="1">Parent</option>
            <option value="2">Student</option>
            <option value="3">Other</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="" style={{ width: "20px" }} />
        <div className="col">Order Code</div>
        <div className="col">Date</div>
        <div className="col">Type</div>
        <div className="col">Name</div>
        <div className="col">Email</div>
        <div className="col">Phone No.</div>
      </div>
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
      <OrderListDetail
        handleClick={() => {
          props.handleClick();
        }}
      />
    </div>
  );
}

function OrderDetailBlock(props: any) {
  let totalPrice = 0;
  return (
    <div
      style={{
        borderRadius: "5px",
        background: "whitesmoke",
        paddingTop: "10px",
        paddingBottom: "10px",
        marginTop: "10px",
        marginBottom: "10px",
      }}
      className="row"
    >
      <div className="col-2">
        <input
          className="form-control"
          placeholder="Type to search..."
          value={props.orderCode}
        />
      </div>
      <div className="col-2">
        <input
          className="form-control"
          placeholder="Type to search..."
          value={props.orderDate}
        />
      </div>
      <div className="col-6">
        {props.item.map((content: any, key: any) => {
          totalPrice += content.price;
          return (
            <div className="row" style={{ paddingBottom: "5px" }}>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Type to search..."
                  value={content.itemCode}
                />
              </div>
              <div className="col">{content.itemName}</div>
              <div className="col">
                <input
                  className="form-control"
                  placeholder="Type to search..."
                  value={content.price}
                />
              </div>
            </div>
          );
        })}
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div
            className="col"
            style={{ borderStyle: "solid hidden hidden hidden" }}
          >
            {totalPrice}
          </div>
        </div>
      </div>
      <div className="col-2">
        <input
          className="form-control"
          placeholder="Type to search..."
          value={props.status}
        />
      </div>
    </div>
  );
}

function OrderDetail(props: any) {
  let [showMore, setShowMore] = useState(false);
  return (
    <div>
      <h3 style={{ textAlign: "center", padding: "10px" }}>Order Detail</h3>
      Order Code: 203459
      <div className="row">
        <div className="col-4" style={{ padding: "0" }}>
          <div style={{ background: "Gainsboro", padding: "10px" }}>
            <h4>Personal Information</h4>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col">Type:</div>
              <div className="col">Parent</div>
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col">Name:</div>
              <div className="col">Ms Chan Man Man</div>
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col">Email:</div>
              <div className="col">cmm123@gmail.com</div>
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col">Phone No:</div>
              <div className="col">97778331</div>
            </div>
            <h4>Related Student</h4>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col">Related Student:</div>
              <div className="col">Lam Siu Man</div>
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col">Student No.:</div>
              <div className="col">3678093128</div>
            </div>
            <div
              className="row"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              <div className="col">Form:</div>
              <div className="col">4</div>
            </div>
            <div className="row justify-content-end">
              <button
                type="button"
                className="col-4 btn btn-outline-secondary"
                style={{ marginRight: "15px" }}
              >
                Edit User Info
              </button>
            </div>
          </div>
        </div>
        <div
          className="col"
          style={{ marginRight: "10px", marginLeft: "10px" }}
        >
          <h4>Product Details</h4>
          <div className="row">
            <div className="col">Order Code</div>
            <div className="col">Order Date</div>
            <div className="col">Item Code</div>
            <div className="col">Item Name</div>
            <div className="col">Price ($)</div>
            <div className="col">Status</div>
          </div>
          <OrderDetailBlock
            orderCode="203459"
            orderDate="19/03/2021"
            item={[
              { itemCode: "XS1984", itemName: "Junior Form Dress", price: 89 },
              { itemCode: "L1984", itemName: "Senior Form Dress", price: 99 },
            ]}
            status="Ordered"
          />
          {showMore ? (
            <div>
              <OrderDetailBlock
                orderCode="199459"
                orderDate="07/01/2021"
                item={[
                  {
                    itemCode: "P002",
                    itemName: "",
                    price: 0,
                  },
                  {
                    itemCode: "B903",
                    itemName: "Junior Belt",
                    price: 15,
                  },
                ]}
                status="Delivered"
              />
              <OrderDetailBlock
                orderCode="103259"
                orderDate="9/01/2020"
                item={[
                  {
                    itemCode: "C185",
                    itemName: "Cushion",
                    price: 50,
                  },
                ]}
                status="Ordered"
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="row justify-content-end">
        <div style={{ width: "320px" }}>
          {showMore ? null : (
            <button
              type="button"
              className=" btn btn-outline-secondary"
              // style={{ marginRight: "15px" }}
              onClick={() => setShowMore(true)}
            >
              Edit other orders from this customer
            </button>
          )}
        </div>
        <button
          type="button"
          className="col-1 btn btn-primary"
          onClick={() => {
            props.handleClick();
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default function EditOrder() {
  let [showList, setShowList] = useState(true);

  function handleDone() {
    setShowList(true);
  }

  function handleDetail() {
    setShowList(false);
  }

  return (
    <div>
      <NavBar />
      <div style={{ margin: "0 auto", maxWidth: "1080px" }}>
        {showList ? (
          <OrderList handleClick={() => handleDetail()} />
        ) : (
          <OrderDetail handleClick={() => handleDone()} />
        )}
        {/* <OrderList /> */}
        {/* <OrderDetail /> */}
      </div>
    </div>
  );
}
