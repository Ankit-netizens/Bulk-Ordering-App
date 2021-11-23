import React, { Component } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import "../../App.css";
export default class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filter: [],
      names: {},
      sort: "sortby",
      searchtext: "",
      reviews: [],
      active: false,
      clickedVendor: "",
    };
  }
  onChangeSort = (e) => {
    this.setState({
      sort: e.target.value,
    });
    const sorted = this.state.filter.sort((a, b) => {
      if (e.target.value == "price") {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      } else if (e.target.value == "quantity") {
        if (a.quantity < b.quantity) {
          return -1;
        }
        if (a.quantity > b.quantity) {
          return 1;
        }
        return 0;
      } else if (e.target.value == "rating") {
        if (a.vendorRating < b.vendorRating) {
          return -1;
        }
        if (a.vendorRating > b.vendorRating) {
          return 1;
        }
        return 0;
      }
    });
    this.setState({
      //   products: sorted,
      filter: sorted,
    });
  };
  func = (id) => {
    axios
      .get("http://localhost:4000/api/vendor/" + id)
      .then((response) => {
        return response.data.name;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onSearch = (event) => {
    this.setState({
      filter: this.state.products,
    });
    this.setState({ searchtext: event.target.value });
    this.setState({
      filter: this.state.products.filter((product) => {
        const prod = product.productName.toLowerCase();
        const filter = event.target.value.toLowerCase();
        return prod.includes(filter);
      }),
    });
  };
  componentWillMount() {
    axios
      .get("http://localhost:4000/api/product")
      .then((response) => {
        let products = response.data.filter((product) => product.status == "A");
        console.log(products);
        this.setState({ products: products, filter: products });
      })
      .then(() => {
        axios
          .post(
            "http://localhost:4000/api/vendor/getowners",
            this.state.products
          )
          .then((response) => {
            console.log(response.data);
            this.setState({
              names: response.data,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/api/product")
      .then((response) => {
        console.log(response.data);
        let products = response.data.filter(
          (product) =>
            // product.ownerId == JSON.parse(sessionStorage.getItem("User")).id &&
            product.status == "A"
        );
        console.log(products);
        this.setState({ reviews: products });
      })
      .then(() => {
        axios
          .get("http://localhost:4000/api/order/")
          .then((res) => {
            // let orders = res.data
            let products = this.state.reviews;
            console.log(products);

            for (let i = 0; i < products.length; i++) {
              let this_product_orders = res.data.filter(
                (order) => String(order.productId) === String(products[i]._id)
              );
              products[i]["orders"] = this_product_orders;
            }
            this.setState({ reviews: products });
            console.log(products);
          })
          .then(() => {});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  toggle = () => {
    this.setState({ active: !this.state.active });
  };
  render() {
    return (
      <div className="container">
        <Modal
          isOpen={this.state.active}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader
            toggle={this.toggle}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Vendor Reviews
          </ModalHeader>
          <ModalBody>
          <h4>Vendor : {this.state.clickedVendor}</h4>
            {this.state.reviews.filter(review=>this.state.clickedVendor===String(review.vendorName)).map((curr, i) => {
              return(
              <ul>
              {curr.orders.map((order,j)=>(
                  order.review !== undefined? <li>{order.review}</li>:null
              ))}
              </ul>)
            })
          }
          </ModalBody>
        </Modal>
        <table className="table table-striped table-hover">
          <thead>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Search for a product"
              value={this.state.searchtext}
              onChange={this.onSearch}
            />
            <select className="btn btn-secondary" onChange={this.onChangeSort}>
              <option value="sortby">Sort by</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
              <option value="rating">Seller Rating</option>
            </select>
            <p></p>
            <tr className="thead-dark">
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Product Seller</th>
              <th>Seller Rating</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.filter.map((product, i) => {
              return (
                <tr>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  {/* <td>{this.state.names[String(product.ownerId)]?this.state.names[String(product.ownerId)][0]:null}</td> */}
                  {/* <td>{this.state.names[String(product.ownerId)]?this.state.names[String(product.ownerId)][1]:null}</td> */}
                  <td
                    onClick={() => {
                      this.toggle();
                      this.setState({clickedVendor:product.vendorName})
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {product.vendorName}
                  </td>
                  <td>{product.vendorRating}</td>
                  {/* <td>{this.state.names[String(product.ownerId)][1]}</td> */}

                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        console.log(document.getElementById(i).style);
                        document.getElementById(i).style.display = "initial";
                      }}
                    >
                      Place Order
                    </button>
                    {/* <span> </span> */}
                    <form
                      className="input-group"
                      onSubmit={(e) => {
                        e.preventDefault();
                        let orderData = {
                          productId: product._id,
                          customerId: JSON.parse(sessionStorage.getItem("User"))
                            .id,
                          quantity: document.getElementById(i + "i").value,
                        };
                        axios
                          .post("http://localhost:4000/api/order/", orderData)
                          .then((res) => {
                            if (res.data == true) {
                              alert("Order Placed Successfully");
                              window.location.reload();
                            } else {
                              alert("Order Not Placed Successfully");
                            }
                          });
                      }}
                    >
                      <div id={i} style={{ display: "none" }}>
                        <br />
                        <p className="font-weight-bolder">Select Quantity :</p>
                        <input
                          id={i + "i"}
                          className="form-control"
                          type="number"
                          min="0"
                          max={product.quantity}
                        />
                        <br />
                        <input
                          type="submit"
                          className="btn btn-success"
                          value="Confirm"
                        />
                        <span> </span>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => {
                            document.getElementById(i).style.display = "none";
                          }}
                        >
                          Hide
                        </button>
                      </div>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
