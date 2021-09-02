const mongoose = require('mongoose');

const { Product } = require('../models/productModel')

const express = require('express')
const router = express.Router();



router.get('/addProduct',(req,res)=>{
    res.render('addProduct')
})

router.post('/addNewProduct',async (req,res)=>{
    const prod = new Product({
        prodName: req.body.name,
        unit: req.body.unit,
        category: req.body.category,
        price: req.body.price,
        description: req.body.desc,
    })
    const result =  await prod.save();
    console.log(result);
    res.render('adminHome',{allCustomers: [], allProducts: []});
})

router.get('/showAllProducts',async (req,res)=>{
    const result = await Product.find();
    console.log(result)
    res.render('adminHome',{allCustomers: [], allProducts: result})
})

router.get('/deleteProduct/:prodID',async (req,res)=>{
    console.log(req.params.prodID);
    const result = await Product.findByIdAndDelete(req.params.prodID)
    console.log(result)

    const prod = await Product.find();
    res.render('adminHome',{allCustomers: [], allProducts: prod})
})


module.exports.productRouter = router;