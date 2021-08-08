import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AccountManage from "./pages/AccountManage";
import CreateUserAccount from "./pages/accountCreation/CreateUserAccount";
import OrderManagement from "./pages/orderManagement/OrderManagement";
import ManualCreateAccount from "./pages/accountCreation/ManualCreateAccount";
import UnknowPath from "./pages/UnknowPath";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CreateNewOrder from "./pages/orderManagement/CreateNewOrder";
import EditOrder from "./pages/orderManagement/EditOrder";
import VerifyAccount from "./pages/accountCreation/VerifyAccount";
import EditUser from "./pages/accountCreation/EditUser";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <NavBar />
            <Home />
          </Route>
          <Route exact path="/account-managemant">
            <AccountManage />
          </Route>
          <Route exact path="/account-managemant/create-user-account">
            <CreateUserAccount />
          </Route>
          <Route exact path="/order-managemant">
            <OrderManagement />
          </Route>
          <Route exact path="/order-managemant/create-order">
            <CreateNewOrder />
          </Route>
          <Route exact path="/order-managemant/edit-order">
            <EditOrder />
          </Route>
          <Route exact path="/account-managemant/manual-create-account">
            <ManualCreateAccount />
          </Route>
          <Route exact path="/verify-user-account">
            <VerifyAccount />
          </Route>
          <Route exact path="/edit-user">
            <EditUser />
          </Route>
          <Route path="*">
            <UnknowPath />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
