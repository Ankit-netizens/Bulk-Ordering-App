import React, { Component } from "react";
import axios from "axios";
export default class CancelProduct extends Component {
  constructor(props) {
    super(props);
  }
  onClick(id) {
    const url = "http://localhost:4000/api/product/" + id;
    // console.log(url)
    axios
      .put(url, {
        status: "C"
      })
      .catch(err => console.log(err));
    window.location.reload();
  }
  render() {
    return (
      <button
        type="submit"
        onClick={() => this.onClick(this.props.value)}
        className="btn btn-danger"
      >
        Cancel
      </button>
    );
  }
}
