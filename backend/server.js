const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require("./models/user");

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/DeliveryApp", {
  useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established succesfully.");
});

// API endpoints

// Getting all the users
userRoutes.route("/").get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// Adding a new user
userRoutes.route("/add").post(function(req, res) {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({
        User: "User added successfully"
      });
    })
    .catch(err => {
      res.status(400).send("Error");
    });
});

// Getting a user by id
userRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    res.json(user);
  });
});
//routes
const vendorRouter = require("./routes/vendor");
const customerRouter = require("./routes/customer");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const validateRouter = require("./routes/validate");
app.use("/api/vendor", vendorRouter);
app.use("/api/customer", customerRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/validate", validateRouter);
app.use("/", userRoutes);

app.listen(PORT, function() {
  console.log("Server is running on port: " + PORT);
});
