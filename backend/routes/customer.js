const express = require('express');
const customerRouter = express.Router();
const Customer = require('../models/customer')
customerRouter.get('/', function (req, res) {
    Customer.find(function (err, customers) {
        if (err) {
            console.log(err);
            res.status(400).send('Error');
        } else {
            // console.log(customers);
            res.json(customers);
        }
    });
});
customerRouter.get(('/:id'), function (req, res) {
    let id = req.params.id;
    Customer.findById(id, function (err, customer) {
        if (err) {
            res.status(400).send("Unable to find customer of given id")
        } else {
            res.json(customer);
        }
    });
});
customerRouter.post(('/'), function (req, res) {
    Customer.findOne({username: req.body.username},function(err,customer){
        if(customer != null){
            res.status(200).send(false);
            return;
        }
        else{
            let customer = new Customer(req.body);
            customer.save().then(customer => {
            res.status(200).send(true);
        })
        .catch(err => {
            // console.log(err)
            res.status(400).send('Error');
        });
        }
    })
    
});
customerRouter.delete(('/:id'), function (req, res) {
    let id = req.params.id;
    Customer.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(400).send('Error');
        } else {
            res.status(200).send('Successfully deleted given customer.');
        }
    });
});
customerRouter.put('/:id', function (req, res) {
    let id = req.params.id;
    Customer.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            res.status(400).send('Unable to update customer');
        } else {
            res.status(200).send('Successfully updated customer');
        }
    });
});
module.exports = customerRouter;