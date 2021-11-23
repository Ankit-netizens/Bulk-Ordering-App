const Customer = require("../models/customer");
const Vendor = require("../models/vendor");
const express = require("express");
const validateRouter = express.Router();

validateRouter.post("/", function(req, res) {
  let type = req.body.type;
  if (type === "customer") {
    Customer.findOne(
      {
        username: req.body.username,
        password: req.body.password
      },
      function(err, customer) {
        if (err) {
          res.status(400).send("unable to process request");
        } else {
          if (customer === null) {
            res.status(200).send(false);
          } else {
            res.status(200).send(customer);
          }
        }
      }
    );
  } else if (type === "vendor") {
    Vendor.findOne(
      {
        username: req.body.username,
        password: req.body.password
      },
      function(err, vendor) {
        if (err) {
          res.status(400).send("unable to process request");
        } else {
          if (vendor === null) {
            res.status(200).send(false);
          } else {
            res.status(200).send(vendor);
          }
        }
      }
    );
  }
});
module.exports = validateRouter;
