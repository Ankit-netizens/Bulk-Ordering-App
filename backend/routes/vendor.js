const express = require("express");
const vendorRouter = express.Router();
const Vendor = require("../models/vendor");
vendorRouter.get("/", function(req, res) {
  Vendor.find(function(err, vendors) {
    if (err) {
      console.log(err);
      res.status(400).send("Error");
    } else {
      res.json(vendors);
    }
  });
});
vendorRouter.get("/:id", function(req, res) {
  let id = req.params.id;
  Vendor.findById(id, function(err, vendor) {
    if (err) {
      res.status(400).send("Unable to find vendor of given id");
    } else {
      res.json(vendor);
    }
  });
});
vendorRouter.post("/", function(req, res) {
  Vendor.findOne({ username: req.body.username }, function(err, vendor) {
    if (vendor != null) {
      res.status(200).send(false);
      return;
    } else {
      let vendor = new Vendor(req.body);
      vendor
        .save()
        .then(vendor => {
          res.status(200).send(true);
        })
        .catch(err => {
          // console.log(err)
          res.status(400).send("Error");
        });
    }
  });
});
vendorRouter.post("/getowners", function(req, res) {
  data = req.body;
  owners = new Object();
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i]);
    let owner = new Object(data[i]);
    Vendor.findById(String(owner.ownerId), function(err, vendor) {
      let obj = new Object();
      // console.log(owner.ownerId, i);
      obj[owner.ownerId] = [vendor.name, vendor.rating];
      // console.log(obj);
      owners = { ...owners, ...obj };
    });
  }
  setTimeout(() => {
    res.status(200).send(owners);
  }, 100);
});
vendorRouter.delete("/:id", function(req, res) {
  let id = req.params.id;
  Vendor.findByIdAndDelete(id, function(err) {
    if (err) {
      res.status(400).send("Error");
    } else {
      res.status(200).send("Successfully deleted given vendor.");
    }
  });
});
vendorRouter.put("/:id", function(req, res) {
  let id = req.params.id;
  Vendor.findById(id, async function(err, vendor) {
    if (err) {
      res.status(400).send(false);
    } else {
      let totalRatings = vendor.totalRatings;
      let rating = vendor.rating;
      let sumall = Number(rating * totalRatings) + Number(req.body.rating);
      // console.log(sumall,rating,totalRatings,rating*totalRatings,req.body.rating)
      let newrating = sumall / (totalRatings + 1);
      // console.log(newrating)
      let updateRating = {
        rating: newrating,
        totalRatings: totalRatings + 1
      };
      console.log(updateRating);
      await Vendor.findByIdAndUpdate(id, updateRating, function(err) {
        if (err) {
          console.log(err);
          res.status(400).send(false);
        } else {
          res.status(200).send(true);
        }
      });
    }
  });
});
module.exports = vendorRouter;
