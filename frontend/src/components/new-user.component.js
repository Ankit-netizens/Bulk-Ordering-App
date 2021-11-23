import React, { Component } from "react";
import axios from "axios";
export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      type: "customer",
      name: "",
      success: 2
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
  onChangeName = event => {
    this.setState({
      name: event.target.value
    });
  };
  onChangePassword = event => {
    this.setState({ password: event.target.value });
  };
  onSubmit = e => {
    //   let a = "ds";
    e.preventDefault();
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.name === ""
    ) {
      this.setState({
        success: 2
      });
      return;
    }
    const newuser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password
    };
    console.log(newuser);
    if (this.state.type == "customer") {
      axios.post("http://localhost:4000/api/customer/", newuser).then(res => {
        if (res.data == false) {
          this.setState({
            success: 0
          });
        } else if (res.data == true) {
          this.setState({
            success: 1
          });
        }
      });
    } else if (this.state.type == "vendor") {
      axios.post("http://localhost:4000/api/vendor/", newuser).then(res => {
        if (res.data == false) {
          this.setState({
            success: 0
          });
        } else if (res.data == true) {
          this.setState({
            success: 1
          });
        }
      });
    }
    this.setState({
      name: "",
      username: "",
      password: ""
    });
  };
  render() {
    return (
      <div className="Login">
        <p className="text-primary">New user? Register Here.</p>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Your Username: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Your Password: </label>
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
              value="Create Account"
              className="btn btn-primary"
              onClick={this.onSubmit}
            />
          </div>
        </form>
        {this.state.success === 0 ? (
          <p className="alert-danger">
            Username already exists, please choose a different username
          </p>
        ) : null}
        {this.state.success === 1 ? (
          <p className="alert-success">User successfully registered.</p>
        ) : null}
      </div>
    );
  }
}
