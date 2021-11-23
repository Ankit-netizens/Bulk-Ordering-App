import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
export default class DispatchedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/product")
      .then(response => {
        console.log(response.data);
        let products = response.data.filter(
          product =>
            product.ownerId == JSON.parse(sessionStorage.getItem("User")).id &&
            product.status == "D"
        );
        this.setState({ products: products });
      })
      .then(() => {
        axios
          .get("http://localhost:4000/api/order/")
          .then(res => {
            // let orders = res.data
            let products = this.state.products;
            for (let i = 0; i < products.length; i++) {
              let this_product_orders = res.data.filter(
                order => String(order.productId) === String(products[i]._id)
              );
              products[i]["orders"] = this_product_orders;
            }
            this.setState({ products: products });
            console.log(products);
          })
          .then(() => {});
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
            <th>Reviews and Ratings</th>
          </tr>
        </thead>
        <tbody>
          {this.state.products.map((product, i) => {
            return (
              <tr>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                {/* <td>{product.quantity}</td> */}
                {this.state.products[i]["orders"]
                  ? this.state.products[i]["orders"].map((order, j) => {
                      return (
                        <ul>
                          <li>
                            Rating: {order.rating} <br/>
                            Review: {order.review}
                          </li>
                        </ul>
                      );
                    })
                  : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
