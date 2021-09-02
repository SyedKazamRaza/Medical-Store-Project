const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, userDetails} = require('../models/userModel')

let alreadyExist;
let notExist;
router.get('/login',(req,res)=>{
    res.render('login',{notExist: false});
})

router.post('/login',async (req,res)=>{
    let userT;
    if(req.body.customer){
        userT = 'customer'
    }
    if(req.body.admin){ userT = 'admin' }
    // console.log(userT)
    const result = await User.find().and([{username: req.body.username}, {password: req.body.pass},{ userType: userT }])
    if(result.length == 0){
        return res.render('login',{notExist: true})
    }
    console.log('Login Details: ',result)
    // console.log(" result.details of result: ", result[0].details)

    if(userT == 'customer') return res.render('userHome',{loginDetails: result[0], allDetails: []});
    res.render('adminHome',{allCustomers: [], allProducts: []});
})

router.get('/signup',(req,res)=>{
    res.render('signup',{alreadyExist: false})
})

router.post('/signup',async(req,res)=>{
    const checkUser = await User.find({username: req.body.username});
    if(checkUser.length != 0){
        return res.render('signup',{alreadyExist: true})
    }

    const userd = new userDetails({
        name: req.body.nm,
        phone: req.body.tele,
        address: req.body.address,
        age: req.body.age
    })
    const result = await userd.save()
    // console.log("User details: ",result);

    const myuser = new User({
        username: req.body.username,
        password: req.body.pass,
        userType: 'customer',
        details: result._id
    })

    const secondResult = await myuser.save();
    console.log("login details :",secondResult);

    res.render('userHome',{loginDetails: secondResult, allDetails: []});
})

router.get('/adminHome',(req,res)=>{
    res.render('adminHome',{allCustomers: [], allProducts: []})
})

router.get('/showAll',async (req,res)=>{
    const result = await User.find()
                    .populate('details');
    res.send(result)
    
})

router.get('/showAllCustomers',async (req,res)=>{
    const result = await User.find().populate('details');
    // console.log(result);
    res.render('adminHome',{allCustomers: result, allProducts: []})
})

router.get('/logout',(req,res)=>{
    res.render('index')
})

module.exports.UserRouter = router;