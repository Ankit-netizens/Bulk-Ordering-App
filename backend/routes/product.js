const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");
const Vendor = require("../models/vendor");
productRouter.get("/", function(req, res) {
  Product.find(async function(err, products) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      final = [];
      for (let i = 0; i < products.length; i++) {
        await Vendor.findById(products[i].ownerId, function(err, vendor) {
          if (err) {
            console.log(err);
          } else {
            final.push({
              _id : products[i]._id,
              productName: products[i].productName,
              price: products[i].price,
              quantity: products[i].quantity,
              ownerId: products[i].ownerId,
              status: products[i].status,
              totalQuantity: products[i].totalQuantity,
              vendorName: vendor.name,
              vendorRating: vendor.rating
            });
          }
        });
      }
      setTimeout(()=>{
        res.status(200).send(final)
      },100)
    }
  });
});
productRouter.get("/:id", function(req, res) {
  let id = req.params.id;
  Product.findById(id, function(err, product) {
    if (err) {
      res.status(400).send("Unable to find product of given id");
    } else {
      res.json(product);
    }
  });
});
productRouter.post("/", function(req, res) {
  let product = new Product(req.body);
  console.log(req.body);
  product
    .save()
    .then(product => {
      res.status(200).send(true);
    })
    .catch(err => {
      // console.log(err)
      res.status(200).send(false);
    });
});
productRouter.delete("/:id", function(req, res) {
  let id = req.params.id;
  Product.findByIdAndDelete(id, function(err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send("Successfully deleted given product.");
    }
  });
});
productRouter.put("/:id", function(req, res) {
  let id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, function(err) {
    if (err) {
      res.status(400).send("Unable to update product");
    } else {
      res.status(200).send("Successfully updated product");
    }
  });
});
module.exports = productRouter;
