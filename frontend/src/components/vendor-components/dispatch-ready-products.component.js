import React, { Component } from "react";
import axios from "axios";
import DispatchProduct from "./dispatch.component";
import CancelProduct from "./cancel.component";
import "../../App.css";
export default class DispatchReadyProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/product/")
      .then(response => {
        console.log(response.data);
        let products = response.data.filter(
          product =>
            product.ownerId == JSON.parse(sessionStorage.getItem("User")).id &&
            product.status == "R"
        );
        this.setState({ products: products });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            {/* <th>Quantity</th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map((product, i) => {
            return (
              <tr>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                {/* <td>{product.quantity}</td> */}
                <td>
                  <DispatchProduct value={product._id}/>{"  "}
                  <CancelProduct value={product._id}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
