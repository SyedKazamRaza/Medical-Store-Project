const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    prodName: {
        type: String, required: true, },
    category: {
        type: String, required: true, },
    unit:{
        type: String, required: true,  },
    price: { 
        type: Number, required: true, min: 1 },
    description: {
        type: String, required: true, }
})

const Product = mongoose.model('products',productSchema);

module.exports.Product = Product;
