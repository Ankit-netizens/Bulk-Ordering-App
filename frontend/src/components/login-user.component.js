import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import axios from "axios";
import "../App.css";
import CreateUser from "../components/create-user.component";
export default class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      type: "customer",
      auth: false,
      logErr: false
    };
  }
  onChangeType = event => {
    this.setState({
      type: event.target.value
    });
  };
  onChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.username === "" || this.state.password === "") {
      alert("Please fill the required fields.")
      return;
    }
    const loginData = {
      username: this.state.username,
      password: this.state.password,
      type: this.state.type
    };
    axios
      .post("http://localhost:4000/api/validate", loginData)
      .then(res => {
        if (res.data === false) {
          this.setState({
            auth: false,
            logErr: true
          });
        } else {
          this.setState({
            auth: true,
            logErr: true
          });
          let storageItem = {
            id: res.data._id,
            type: this.state.type,
            username: res.data.username,
            name: res.data.name
          };
          window.sessionStorage.setItem("User", JSON.stringify(storageItem));
          console.log(JSON.parse(window.sessionStorage.getItem("User")).id);
        }
        // console.log(res.data)
      })
      .catch(err => console.log(err));

    this.setState({
      username: "",
      password: "",
      name: ""
    });
  };

  render() {
    return (
      <div className="Login">
        <Navbar
          style={{ marginBottom: "0" }}
          inverse
          className="fixed-top collapseOnSelect nav-bar"
          color="dark"
          dark
        >
          <NavbarBrand>Welcome to Bulk Order Delivery App.</NavbarBrand>
        </Navbar>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"><br/><br/>
            <label>Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <select
            className="browser-default custom-select"
            onChange={this.onChangeType}
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>
          <div className="form-group">
            <input
              type="submit"
              value="Login"
              className="btn btn-primary"
              onClick={this.onSubmit}
            />
          </div>
          {this.state.logErr === true ? (
            this.state.auth === false ? (
              <p className="alert-danger">Incorrect Username or Password</p>
            ) : // <userContext.Consumer>
            // </userContext.Consumer>
            this.state.type === "customer" ? (
              <Redirect to="/customer/" />
            ) : (
              <Redirect to="/vendor/" />
            )
          ) : null}
        </form>
      </div>
    );
  }
}
