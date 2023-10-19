var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String
    
});

module.exports = mongoose.model('Product', productSchema)