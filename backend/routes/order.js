const express = require("express");
const orderRouter = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const Vendor = require("../models/vendor");
orderRouter.get("/", function(req, res) {
  Order.find(function(err, orders) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      // console.log(orders);
      res.json(orders);
    }
  });
});
orderRouter.get("/:id", function(req, res) {
  let id = req.params.id;
  Order.findById(id, function(err, order) {
    if (err) {
      res.status(400).send("Unable to find order of given id");
    } else {
      res.json(order);
    }
  });
});
orderRouter.post("/", function(req, res) {
  let order = new Order(req.body);
  order
    .save()
    .then(order => {
      res.status(200).send(true);
      Product.findById(order.productId, async function(err, product) {
        let quant = product.quantity;
        if (order.quantity > quant) {
          res.send(false);
        } else {
          quant = quant - order.quantity;
          if (quant == 0) {
            Product.findByIdAndUpdate(
              order.productId,
              { status: "R" },
              function(err) {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }

        await Product.findByIdAndUpdate(order.productId, {
          quantity: quant
        });
      });
    })
    .catch(err => {
      // console.log(err)
      res.status(400).send("Error");
    });
});
orderRouter.delete("/:id", function(req, res) {
  let id = req.params.id;
  Order.findByIdAndDelete(id, function(err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send("Successfully deleted given order.");
    }
  });
});
orderRouter.put("/dispatch/:id", function(req, res) {
  let id = req.params.id;
  Order.findByIdAndUpdate(id, req.body, function(err) {
    if (err) {
      res.status(400).send(false);
    } else {
      res.status(200).send(true);
    }
  });
});
orderRouter.put("/:id", function(req, res) {
  let id = req.params.id;
  Order.findById(id, async function(err, order) {
    if (err) {
      res.status(400).send("Unable to update order");
    } else {
      let productId = order.productId;
      let orderedQuantity = order.quantity;
      let newQuantity = req.body.quantity;
      await Product.findById(productId, function(err, product) {
        if (product.quantity + orderedQuantity - newQuantity < 0) {
          res.status(400).send("Unable to update order");
        } else {
          let updatedQuantity =
            product.quantity + orderedQuantity - newQuantity;
          Order.findByIdAndUpdate(id, req.body, async function(err) {
            if (err) {
              console.log(err);
            } else {
              let status = "A";
              if (updatedQuantity == 0) {
                status = "R";
              }
              await Product.findByIdAndUpdate(
                productId,
                {
                  quantity: updatedQuantity,
                  status: status
                },
                function(err) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.status(200).send(true);
                  }
                }
              );
            }
          });
        }
      });
    }
  });
});
orderRouter.post("/getmyorders", function(req, res) {
  Order.find(function(err, orders) {
    // console.log(req.body.userId)
    orders = orders.filter(order => order.customerId === req.body.userId);
    let Orders = [];
    for (let i = 0; i < orders.length; i++) {
      Product.findById(orders[i].productId, async function(err, product) {
        // let obj = new Object();
        var obj = product._doc;
        // console.log(product);
        obj["orderedQuantity"] = orders[i].quantity;
        obj = { ...obj, orderedQuantity: orders[i].quantity };
        obj = { ...obj, orderId: orders[i]._id };
        await Vendor.findById(obj.ownerId, function(err, vendor) {
          if (err) {
            console.log(err);
          } else {
            obj = { ...obj, vendorName: vendor.name };
            console.log(obj["status"]);
            if (obj["status"] == "A") {
              obj["status"] = "Waiting";
              obj["className"] = "text-secondary";
            } else if (obj["status"] == "C") {
              obj["status"] = "Cancelled";
              obj["className"] = "text-danger";
            } else if (obj["status"] == "R") {
              obj["status"] = "Placed";
              obj["className"] = "text-info";
            } else if (obj["status"] == "D") {
              obj["status"] = "Dispatched";
              obj["className"] = "text-success";
            }
            // console.log(obj);
            Orders.push(obj);
          }
        });
        // console.log(obj["status"]);
        // if (obj["status"] == "A") {
        //   obj["status"] = "Waiting";
        //   obj["className"] = "text-secondary";
        // } else if (obj["status"] == "C") {
        //   obj["status"] = "Cancelled";
        //   obj["className"] = "text-danger";
        // } else if (obj["status"] == "R") {
        //   obj["status"] = "Placed";
        //   obj["className"] = "text-info";
        // } else if (obj["status"] == "D") {
        //   obj["status"] = "Dispatched";
        //   obj["className"] = "text-success";
        // }
        // // console.log(obj);
        // Orders.push(obj);
      });
      // Orders.push()
    }
    setTimeout(() => {
      console.log(Orders);
      res.status(200).send(Orders);
    }, 100);
  });
});
module.exports = orderRouter;
