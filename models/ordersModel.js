const mongoose = require('mongoose');
const { userDetails } = require('./userModel')

const ordersSchema =  new mongoose.Schema({
    products:{
        type: [ String ], required: true, },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDetails', required: true },
    date: {
        type: Date, default: Date.now },
    totalBill: {
        type: Number, required: true, min: 1 }
})

const Orders = mongoose.model('orders',ordersSchema);

module.exports.Orders = Orders;