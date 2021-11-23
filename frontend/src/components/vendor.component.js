import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { NavbarBrand, Navbar } from "reactstrap";
import LogoutUser from "../components/logout.component";
import CreateProduct from "./vendor-components/create-product.component";
import AvailableProducts from "./vendor-components/available-products.component";
import DispatchReadyProducts from "./vendor-components/dispatch-ready-products.component";
import DispatchedProducts from "./vendor-components/dispatched-products.component";
export default class VendorComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar
          style={{ marginBottom: "0" }}
          inverse
          className="fixed-top collapseOnSelect nav-bar"
          color="dark"
          dark
        >
          <NavbarBrand>Welcome to Bulk Order Delivery App.</NavbarBrand>
          <NavbarBrand>
            <Link to="/vendor/createproduct" className="btn btn-secondary">
              Create Product
            </Link>
          </NavbarBrand>
          <NavbarBrand>
            <Link to="/vendor/" className="btn btn-secondary">
              View Available Products
            </Link>
          </NavbarBrand>
          <NavbarBrand>
            <Link
              to="/vendor/dispatchreadyproducts"
              className="btn btn-secondary"
            >
              Ready to Dispatch
            </Link>
          </NavbarBrand>
          <NavbarBrand>
            <Link to="/vendor/dispatchedproducts" className="btn btn-secondary">
              Dispatched Products
            </Link>
          </NavbarBrand>
          <NavbarBrand>
            <LogoutUser />
          </NavbarBrand>
        </Navbar>
        <Route path="/vendor/createproduct" exact component={CreateProduct} />
        <Route path="/vendor/" exact component={AvailableProducts} />
        <Route
          path="/vendor/dispatchreadyproducts"
          exact
          component={DispatchReadyProducts}
        />
        <Route
          path="/vendor/dispatchedproducts"
          exact
          component={DispatchedProducts}
        />
      </div>
    );
  }
}
