import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
export default class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      price: "",
      quantity: "",
      success: 2
    };
  }
  onChangeQuantity = event => {
    this.setState({
      quantity: event.target.value
    });
  };
  onChangeProductname = event => {
    this.setState({ productName: event.target.value });
  };

  onChangePrice = event => {
    this.setState({ price: event.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (
      this.state.productName === "" ||
      this.state.price === "" ||
      this.state.quantity === ""
    ) {
      return;
    }
    const productData = {
      productName: this.state.productName,
      price: this.state.price,
      quantity: this.state.quantity,
      ownerId: JSON.parse(sessionStorage.getItem("User")).id,
      status: "A"
    };
    // console.log(productData);
    axios
      .post("http://localhost:4000/api/product/", productData)
      .then(res => {
        if (res.data == false) {
          this.setState({
            success: 0
          });
        } else if (res.data == true) {
          this.setState({
            success: 1
          });
        }
      })
      .catch(err => console.log(err));

    this.setState({
      productName: "",
      price: "",
      quantity: ""
    });
  };

  render() {
    return (
      <div className="container" id="createProduct">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Product Name : </label>
            <input
              type="text"
              className="form-control"
              value={this.state.productName}
              onChange={this.onChangeProductname}
            />
          </div>
          <div className="form-group">
            <label>Price :</label>
            <input
              type="number"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Quantity :</label>
            <input
              type="number"
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
              min="0"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary"
            />
          </div>
        </form>
        {this.state.success === 0 ? (
          <p className="alert-danger">
            Error adding new product, make sure you enter appropriate price and
            quantity.
          </p>
        ) : null}
        {this.state.success === 1 ? (
          <p className="alert-success">Product successfully added.</p>
        ) : null}
      </div>
    );
  }
}
