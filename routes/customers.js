const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, userDetails} = require('../models/userModel')
const { Product } = require('../models/productModel')
const { Orders } = require('../models/ordersModel');

let customerID;

router.get('/userHome',(req,res)=>{
    res.render('userHome',{loginDetails: {}, allDetails: []})
})

router.get('/accountDetails/:custUsernm',async (req,res)=>{
    const loginDetails = await User.find({username: req.params.custUsernm})
    const userD = await userDetails.find({_id: loginDetails[0].details})
    let result = [loginDetails[0], userD[0]]
    res.render('userHome',{loginDetails: {}, allDetails: result})
})

router.post('/accountDetails/:custID',async (req,res)=>{
    // console.log(req.params.custID)
    const updatedResult = await User.findOneAndUpdate({_id: req.params.custID},{
        password: req.body.pass
    })
    // console.log(updatedResult)
    const updatedDetails = await userDetails.findOneAndUpdate({_id: updatedResult.details},{
        name: req.body.nm,
        phone: req.body.tele,
        address: req.body.address,
        age: req.body.age
    })
    // console.log(updatedDetails)
    res.render('userHome',{loginDetails: updatedResult, allDetails: []});
})

router.get('/showProducts/:custID',async (req,res)=>{
    // console.log(req.params.custID)
    const prod = await Product.find();
    customerID =req.params.custID;
    console.log('Here customer ID is: ',customerID)
    res.render('showProducts',{customerID: req.params.custID, allProducts : prod, message: ''})
})

let orderProducts = []
router.post('/addToCart/:prodID',async (req,res)=>{
    // console.log(req.body)
    if(req.body.quantity == null || req.body.quantity == 0){
        const prod = await Product.find();
        return res.render('showProducts',{allProducts : prod, message: 'Please select valid quantity.'})
    }
    const result = await Product.findById(req.params.prodID);
    // console.log('**********************************')
    // console.log(result)
    const singleProd = {
        name: result.prodName,
        quantity: parseInt(req.body.quantity),
        price: parseInt(result.price)
    }

    const index = orderProducts.findIndex(m => m.name === result.prodName);
    // console.log('Index is: ',index)
    if(index >= 0){
        orderProducts[index].quantity += parseInt(req.body.quantity)
        // console.log(orderProducts)
    }
    else{
        orderProducts.push(singleProd);
        // console.log('...........................................');
        // console.log(orderProducts)
    }
    const prod = await Product.find();
    return res.render('showProducts',{allProducts : prod, message: 'Medicine Added to cart.'})
})

router.post('/orderNow',async (req,res)=>{
    // console.log(customerID);
    if(orderProducts.length == 0){
        const prod = await Product.find();
        return res.render('showProducts',{allProducts : prod, message: 'Select the required medicines first Then Place Order.'})
    }

    let productsArr = [];
    let total = 0;
    orderProducts.forEach(element => {
        productsArr.push(element.name);
        total += (element.quantity * element.price )
    });
    // console.log('productsArr: ',productsArr);
    // console.log('total bill: ',total);
    const orderObj = new Orders({
        products: productsArr,
        customerId: customerID,
        totalBill: total
    })
    const result = await orderObj.save();
    console.log('Result obj: ',result)

    res.render('showOrderToCustomer',{ orderData: result });

})

router.get('/logout',(req,res)=>{
    customerID: null;
    res.render('index')
})

module.exports.customerRouter = router
