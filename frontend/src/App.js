import React, { Component, useState } from "react";
import { Navbar, NavbarBrand, CustomInput } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginUser from "./components/login-user.component";
import NewUser from "./components/new-user.component";
import CustomerComponent from "./components/customer.component";
import VendorComponent from "./components/vendor.component";
function App() {
  // const [user, updateUser] = useState(userContext);
  return (
    <Router>
      {/* <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">
            App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Users
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">
                  Create User
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <br />
        <Route path="/" exact component={UsersList} />
        <Route path="/create" component={CreateUser} />
      </div> */}
      {/* <userContext.Provider value={User.user}> */}
      <div className="container">
        {/* <Navbar
            style={{ marginBottom: "0" }}
            inverse
            className="fixed-top collapseOnSelect nav-bar"
            color="dark"
            dark
          > */}
        {/* <NavbarBrand>Welcome to Bulk Order Delivery App.</NavbarBrand> */}
        {/* <NavbarBrand> */}
        {/* <Route path="/customer/" exact component={LogoutUser} /> */}
        {/* <Route path="/vendor/" exact component={LogoutUser} /> */}
        {/* </NavbarBrand> */}
        {/* </Navbar> */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Route path="/" exact component={LoginUser} />
          </div>
          <div className="col-md-6">
            <Route path="/" exact component={NewUser} />
          </div>
        </div>
        <Route path="/customer/*" exact component={CustomerComponent} />
        <Route path="/vendor/*" exact component={VendorComponent} />
        {JSON.parse(window.sessionStorage.getItem("User")) === null ? (
          <Redirect to="/" />
        ) : null}
        {/* <p>{console.log(window.sessionStorage.getItem("id"))}</p> */}
      </div>
      {/* </userContext.Provider> */}
    </Router>
  );
}

export default App;
