const mongoose = require('mongoose');

const {User, userDetails} = require('../models/userModel')
const { Orders } = require('../models/ordersModel')

const express = require('express')
const router = express.Router();

router.get('/showOrders',async (req,res)=>{
    const allOrders = await Orders.find().sort('-date');
    let customerDetails = []
    for (let index = 0; index < allOrders.length; index++) {
        const Id = allOrders[index].customerId;
        const custId = await User.findById(Id).select('details');
        const details = await userDetails.find({_id: custId.details})
        customerDetails.push(details[0])
    }
    res.render('showOrderToAdmin',{ allOrders: allOrders, customerDetails: customerDetails })
})

router.get('/deleteProduct/:orderId',async (req,res)=>{
    const result = await Orders.findByIdAndDelete(req.params.orderId);
    res.redirect('/adminorders/showOrders')
})


module.exports.adminOrders = router;