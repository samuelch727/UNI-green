import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

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
            <Home style={{ paddingTop: "60px" }} />
          </Route>
          <Route render={() => <Redirect to="/home" />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
