import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
export default class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("User") != null) {
      axios
        .post("http://localhost:4000/api/order/getmyorders", {
          userId: JSON.parse(sessionStorage.getItem("User")).id
        })
        .then(response => {
          console.log(response.data);
          let orders = response.data;
          // let orders = response.data.filter(
          //   order =>
          //     order.customerId == JSON.parse(sessionStorage.getItem("User")).id
          // //     order.status == "A"
          // );
          this.setState({ orders: orders });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
  render() {
    return (
      //   <div className="table-responsive-lg">
      <table className="table table-striped">
        <thead className="thead-dark">
          <h2>My Orders</h2>
          <br />
          <tr>
            <th>Product Name</th>
            <th>Vendor Name</th>
            <th>Ordered Quantity</th>
            <th>Status</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>
          {this.state.orders.map((order, i) => {
            return (
              <tr>
                <td>{order.productName}</td>
                <td>{order.vendorName}</td>
                <td>{order.orderedQuantity}</td>
                <td>
                  <p className={order.className}>{order.status}</p>
                  {order.status == "Waiting" ? (
                    <div>
                      <p>Orders Left : {order.quantity}</p> {/*&emsp;&emsp;*/}
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          console.log(document.getElementById(i).style);
                          document.getElementById(i).style.display = "initial";
                        }}
                      >
                        Edit Order
                      </button>
                    </div>
                  ) : null}
                  <form
                    className="input-group"
                    onSubmit={e => {
                      e.preventDefault();
                      let orderData = {
                        quantity: document.getElementById(i + "i").value
                      };
                      let id = order.orderId;
                      axios
                        .put("http://localhost:4000/api/order/" + id, orderData)
                        .then(res => {
                          if (res.data == true) {
                            alert("Order Edited Successfully");
                            window.location.reload();
                          } else {
                            alert("Unable to edit order");
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
                        min="1s"
                        max={order.quantity + order.orderedQuantity}
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
                  {order.status === "Placed" ? (
                    <div>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          let rating = document.getElementById(i + "r").value;
                          console.log(rating);
                          if (rating != "") {
                            let vendorData = {
                              rating: rating
                            };
                            axios
                              .put(
                                "http://localhost:4000/api/vendor/" +
                                  order.ownerId,
                                vendorData
                              )
                              .then(res => {
                                if (res.data === true) {
                                  alert("Rating successfully given");
                                } else {
                                  alert("Unable to rate");
                                }
                              });
                          } else {
                            alert("Enter the rating");
                          }
                        }}
                      >
                        <button type="submit" className="btn btn-primary">
                          Rate Vendor
                        </button>
                        &emsp;
                        <input
                          id={i + "r"}
                          type="number"
                          min="1"
                          max="5"
                          className="front-control-sm"
                        />
                      </form>
                    </div>
                  ) : null}
                  {order.status === "Dispatched" ? (
                    <div>
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          let rating = document.getElementById(i + "d").value;
                          let review = document.getElementById(i + "v").value;
                          // console.log(rating);
                          if (rating != "" && review != "") {
                            let orderData = {
                              rating: rating,
                              review: review
                            };
                            // console.log(order._id)
                            axios
                              .put(
                                "http://localhost:4000/api/order/dispatch/" +
                                  order.orderId,
                                orderData
                              )
                              .then(res => {
                                if (res.data === true) {
                                  alert("Rating successfully given");
                                } else {
                                  alert("Unable to rate");
                                }
                              });
                          } else {
                            alert("Enter the rating and review");
                          }
                        }}
                      >
                        <button type="submit" className="btn btn-primary">
                          Rate and Review Order
                        </button>
                        <p></p>
                        {/* &emsp; */}
                        <span>Rate : </span>
                        <input
                          id={i + "d"}
                          type="number"
                          min="1"
                          max="5"
                          className="front-control-sm"
                        />
                        <p></p>
                        <span>Review : </span>
                        <input
                          id={i + "v"}
                          type="text"
                          className="front-control"
                        />
                      </form>
                    </div>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      //   </div>
    );
  }
}
