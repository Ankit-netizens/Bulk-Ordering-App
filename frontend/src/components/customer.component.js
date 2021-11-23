import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { NavbarBrand, Navbar } from "reactstrap";
import LogoutUser from "./logout.component";
import Catalogue from "./customer-components/catalogue.component";
import MyOrders from "./customer-components/orders.component";
export default class CustomerComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar
          // style={{ marginBottom: "0" }}
          // inverse
          // className="fixed-top collapseOnSelect nav-bar"
          color="dark"
          dark
        >
          <NavbarBrand>Welcome to Bulk Order Delivery App.</NavbarBrand>
          <NavbarBrand>
            <Link to="/customer/" className="btn btn-secondary">
              Catalogue
            </Link>
          </NavbarBrand>
          <NavbarBrand>
            <Link to="/customer/myorders" className="btn btn-secondary">
              My Orders
            </Link>
          </NavbarBrand>
          <NavbarBrand>
            <LogoutUser />
          </NavbarBrand>
        </Navbar>
        <Route path="/customer/" exact component={Catalogue} />
        <Route path="/customer/myorders" exact component={MyOrders} />
      </div>
    );
  }
}
